const express = require("express");
const router = express.Router();
const mySqlConnection = require("../conexion");

//? Traer todos los datos de la tabla usuarios ============================================
router.get("/usuario", (req, res) => {
    const query =
      "select id_usuario, concat(nombre, ' ',apellido ) as Nombre, id_estado_usuario, documento, id_celula, correo, id_rol from usuario";
    mySqlConnection.query(query, (err, rows, fields) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    });
  });


module.exports = router;