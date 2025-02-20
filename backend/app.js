const express = require("express");
const mysql = require("mysql2");
const config = require("./config");
const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(express.json());
app.use("/api", userRoutes);

const connection = mysql.createConnection(config.db);

connection.connect((err) => {
  if (err) {
    console.error("Error de conexión a la base de datos:", err);
    return;
  }
  console.log("Conectado a la base de datos MySQL");
});

app.listen(config.port, () => {
  console.log(`Servidor escuchando en el puerto ${config.port}`);
});
