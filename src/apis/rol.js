const express = require("express");
const router = express.Router();
const mySqlConnection = require("../conexion");

//? Traer todos los datos de la tabla rol ============================================
router.get("/rol", (req, res) => {
    const query =
      "select r.id_rol, r.nombre_rol, er.nombre_estado_rol from rol r inner join estado_rol er on er.id_estado_rol = r.estado_rol";
    mySqlConnection.query(query, (err, rows, fields) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    });
  });


module.exports = router;