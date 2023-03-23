const express = require("express");
const router = express.Router();
const mySqlConnection = require("../conexion");

//? Traer todos los datos de la tabla estado rol ============================================
router.get("/estado-rol", (req, res) => {
    const query =
      "select * from estado_rol";
    mySqlConnection.query(query, (err, rows, fields) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    });
  });


module.exports = router;