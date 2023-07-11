const express = require("express");
const router = express.Router();
const mySqlConnection = require("../conexion");

//? Traer todos los datos de la tabla nota ============================================
router.get("/miperfil/:id_usuario", (req, res) => {

    const { id_usuario } = req.params;
    mySqlConnection.query(
      "SELECT u.id_usuario, u.nombre, u.apellido, u.correo, u.documento, c.nombre_celula, r.nombre_rol, td.nombre_tipo_documento FROM `usuario` u inner join celula c on c.id_celula = u.id_celula inner join rol r on r.id_rol = u.id_rol inner join tipo_documento td on td.id_tipo_documento = u.id_tipo_documento WHERE id_usuario = ?",
      [id_usuario],
      (err, rows, fields) => {
        if (!err) {
          if (rows.length >= 1) {
            res.send(rows);
          } else {
            res.json({
              status: "No se encuentran datos del usuario en el localstorage",
              statusCode: 403,
            });
          }
        } else {
          console.log(err);
        }
      }
    );
  });

module.exports = router;