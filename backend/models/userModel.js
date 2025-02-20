const mysql = require("mysql2");
const config = require("../config");

const connection = mysql.createConnection(config.db);

const createCuenta = (cuenta, callback) => {
  const sql =
    "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)";
  connection.query(
    sql,
    [cuenta.name, cuenta.email, cuenta.password, cuenta.role],
    (err, results) => {
      if (err) {
        return callback(err);
      }
      callback(null, results.insertId);
    }
  );
};

module.exports = { createCuenta };
