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

//? Crear rol ============================================
router.post("/crear_rol", (req, res) => {
  //* Se define función para creación de la nota
    const {
      nombre_rol
    } = req.body;
    mySqlConnection.query(
      "INSERT INTO rol(nombre_rol) values (?)",
      [
        nombre_rol    
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

//?Traer por id de un rol =====================================================================================
  router.get("/rolid/:id_rol", (req, res) => {
    const { id_rol } = req.params;
    query = "select r.id_rol, r.nombre_rol, er.nombre_estado_rol from rol r inner join estado_rol er on er.id_estado_rol = r.estado_rol WHERE id_rol = ?"
    mySqlConnection.query(
      query,
      [id_rol],
      (err, rows, fields) => {
        if (!err) {
          res.send(rows);
        } else {
          console.log(err);
        }
      }
    );
  });


//?Eliminar un rol =====================================================================================
router.delete("/eliminarol/:id", (req, res) => {
  const { id_rol } = req.params;
  mySqlConnection.query(
    "DELETE FROM rol WHERE id_rol = ?",
    [id_rol],
    (err, rows, fields) => {
      if (!err) {
        res.json({
          id_rol,
          status: "Rol eliminado"
        });
      } else {
        console.log(err);
      }
    }
  );
});

module.exports = router;