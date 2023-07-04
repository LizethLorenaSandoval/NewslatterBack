const express = require("express");
const router = express.Router();
const mySqlConnection = require("../conexion");

//? Traer todos los datos de la tabla celula ============================================
router.get("/celula", (req, res) => {
    const query =
      "select * from celula";
    mySqlConnection.query(query, (err, rows, fields) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    });
  });


//? Crear celula ============================================
router.post("/crear_celula", (req, res) => {
//* Se define función para creación de la celula
    const {
      nombre_celula
    } = req.body;
    mySqlConnection.query(
      "INSERT INTO celula(nombre_celula) values (?)",
      [
        nombre_celula    
      ],
      (err, rows, fields) => {
        if (!err) {
          res.json({
            status: "Rol creado",
            statusCode: 200,
          });
        } else {
          console.log(err);
        }
      }
    );
  });  



module.exports = router;