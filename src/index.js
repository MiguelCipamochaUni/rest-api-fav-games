const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");

app.set("port", process.env.PORT || 3000);
app.set("json spaces", 2);

//Middleware
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

//Routes
app.use(require("./routes/index"));

//Iniciando el servidor
app.listen(app.get("port"), () => {
  console.log(`Server listening on port ${app.get("port")}`);
});
