import mysql from "mysql";
import config from "../config";

const connection = mysql.createConnection({
  host: config.host,
  database: config.database,
  user: config.user,
  password: config.password,
});

// Conexion a la base de datos
function connect() {
  connection.connect((err) => {
    if (err) {
      console.error("Error al conectar a la base de datos:", err);
      return;
    }
    console.log("Conexión exitosa a la base de datos");
  });
}

// Ejecutar una consulta SQL
function query(sql, args) {
  return new Promise((resolve, reject) => {
    connection.query(sql, args, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
}

/* const getConnection = () => {
  return connection;
}; */

module.exports = {
  connect,
  query,
};
