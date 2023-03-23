const express = require("express");
const router = express.Router();
const mySqlConnection = require("../conexion");

//? Traer todos los datos de la tabla estado nota ============================================
router.get("/estado-nota", (req, res) => {
    const query =
      "select * from estado_nota";
    mySqlConnection.query(query, (err, rows, fields) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    });
  });


module.exports = router;