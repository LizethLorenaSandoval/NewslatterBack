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

//? Crear tipo_documento ============================================
router.post("/crear_tipo_documento", (req, res) => {
  //* Se define función para creación de la celula
      const {
        tipo_documento,
        nombre_tipo_documento
      } = req.body;
      mySqlConnection.query(
        "INSERT INTO tipo_documento(tipo_documento,nombre_tipo_documento) values (?,?)",
        [
          tipo_documento,
          nombre_tipo_documento    
        ],
        (err, rows, fields) => {
          if (!err) {
            res.json({
              status: "Tipo de documento creado",
              statusCode: 200,
            });
          } else {
            console.log(err);
          }
        }
      );
    });  

module.exports = router;