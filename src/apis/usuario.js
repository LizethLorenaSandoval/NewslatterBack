const express = require("express");
const router = express.Router();
const mySqlConnection = require("../conexion");

//? Traer todos los datos de la tabla usuarios ============================================
router.get("/usuario", (req, res) => {
    const query =
      "select u.id_usuario, concat(u.nombre, ' ',u.apellido) as Nombre, u.id_estado_usuario, td.nombre_tipo_documento, u.documento, c.nombre_celula, u.correo, r.nombre_rol from usuario u inner join tipo_documento td on td.id_tipo_documento = u.id_tipo_documento inner join celula c on c.id_celula = u.id_celula inner join rol r on r.id_rol = u.id_rol";
    mySqlConnection.query(query, (err, rows, fields) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    });
  });


module.exports = router;