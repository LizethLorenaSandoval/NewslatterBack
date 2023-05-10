const express = require("express");
const router = express.Router();
const mySqlConnection = require("../conexion");

//? Traer todos los datos de la tabla imagenes ============================================
router.get("/imagenesapp/:id_imagen", (req, res) => {
    const { id_imagen } = req.params;
    query = "select * from imagenesapp where id_imagen = ?";
    mySqlConnection.query(query, [id_imagen], (err, rows, fields) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    });
  });

module.exports = router;