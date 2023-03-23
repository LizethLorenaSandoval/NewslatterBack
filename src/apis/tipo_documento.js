const express = require("express");
const router = express.Router();
const mySqlConnection = require("../conexion");

//? Traer todos los datos de la tabla tipo de documento  ============================================
router.get("/tipo-documento", (req, res) => {
    const query =
      "select * from tipo_documento";
    mySqlConnection.query(query, (err, rows, fields) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    });
  });


module.exports = router;