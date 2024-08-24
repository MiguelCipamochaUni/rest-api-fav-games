const { Router } = require("express");
const router = Router();
const db = require("../database/database");
const path = require("path");
const upload = require("../utils/storage");

//Raiz
router.get("/get_favorite_games", (req, res) => {
  db.query("SELECT * FROM favorite_games", (error, results) => {
    if (error) {
      console.error(
        "Error fetching favorite_games from the database: " + error.stack
      );
      return res.status(500).json({ error: "Failed to fetch favorite games" });
    }
    res.json(results);
  });
});

router.post("/post_favorite_game", upload.single("image"), (req, res) => {
  const { name, launch_date, amount_stars, reason } = req.body;
  const image_path = req.file ? `uploads/${req.file.filename}` : null;

  const query =
    "INSERT INTO favorite_games (image_url, name, launch_date, amount_stars, reason) VALUES (?, ?, ?, ?, ?)";
  db.query(
    query,
    [image_path, name, launch_date, amount_stars, reason],
    (err, result) => {
      if (err) {
        return res
          .status(500)
          .send(
            "Error al insertar el juego en la base de datos: " + err.message
          );
      }
      res.status(201).send("Juego insertado exitosamente");
    }
  );
});

router.put("/edit_favorite_game/:id", upload.single("image"), (req, res) => {
  const { id } = req.params;
  const { name, launch_date, amount_stars, reason } = req.body;
  let query;
  let values;

  if (req.file) {
    const image_path = path.join("uploads", req.file.filename);
    query =
      "UPDATE favorite_games SET image_url = ?, name = ?, launch_date = ?, amount_stars = ?, reason = ? WHERE id = ?";
    values = [image_path, name, launch_date, amount_stars, reason, id];
  } else {
    query =
      "UPDATE favorite_games SET name = ?, launch_date = ?, amount_stars = ?, reason = ? WHERE id = ?";
    values = [name, launch_date, amount_stars, reason, id];
  }

  db.query(query, values, (err, result) => {
    if (err) {
      return res
        .status(500)
        .send(
          "Error al actualizar el juego en la base de datos: " + err.message
        );
    }

    if (result.affectedRows === 0) {
      return res.status(404).send("Juego no encontrado");
    }

    res.status(201).send("Juego actualizado exitosamente");
  });
});

router.delete("/delete_favorite_game/:id", (req, res) => {
  const { id } = req.params;

  const query = "DELETE FROM favorite_games WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      return res
        .status(500)
        .send("Error al eliminar el juego de la base de datos: " + err.message);
    }
    res.status(201).send("Juego eliminado exitosamente");
  });
});

module.exports = router;
