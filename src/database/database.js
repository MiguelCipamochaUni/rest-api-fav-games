const mysql = require("mysql");
const pool = mysql.createPool({
  connectionLimit: 10, // Número máximo de conexiones en el pool
  host: process.env.MYSQL_ADDON_HOST,
  database: process.env.MYSQL_ADDON_DB,
  user: process.env.MYSQL_ADDON_USER,
  password: process.env.MYSQL_ADDON_PASSWORD,
});

// Exporta el pool en lugar de una sola conexión
module.exports = pool;
