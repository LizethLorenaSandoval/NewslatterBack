const express = require("express");
const router = express.Router();
const mySqlConnection = require("../conexion");

//? Traer todos los datos de la tabla nota ============================================
router.get("/nota", (req, res) => {
    const query =
      "select CONCAT(u.nombre, ' ', u.apellido) AS usuario,c.nombre_celula,n.id_nota, n.titulo, n.descripcion, n.id_celula, n.hora_fecha, n.id_usuario, n.likes_total, n.comentarios_total, n.estado_nota from nota n join usuario u on u.id_usuario = n.id_usuario join celula c on c.id_celula = n.id_celula order by n.hora_fecha desc";
    mySqlConnection.query(query, (err, rows, fields) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    });
  });

//? Crear nota ============================================
router.post("/crear_nota", (req, res) => {
  //* Se define función para creación de la nota
    const {
      titulo,
      id_celula,
      estado_nota,
      id_usuario,
      descripcion
    } = req.body;
    mySqlConnection.query(
      "INSERT INTO nota(titulo,id_celula,estado_nota,id_usuario,descripcion) values (?,?,?,?,?)",
      [
        titulo,      
        id_celula,
        estado_nota,
        id_usuario,
        descripcion     
      ],
      (err, rows, fields) => {
        if (!err) {
          res.json({
            status: "Nota creada",
            statusCode: 200,
          });
        } else {
          console.log(err);
        }
      }
    );
  });

module.exports = router;