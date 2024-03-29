const express = require("express");
const router = express.Router();
const mySqlConnection = require("../conexion");

//? Traer todos los datos de la tabla nota ============================================
router.get("/miperfil/:id_usuario", (req, res) => {

    const { id_usuario } = req.params;
    mySqlConnection.query(
      "SELECT u.id_usuario, u.nombre, u.apellido, u.correo, u.documento, c.id_celula, c.nombre_celula, r.nombre_rol, td.id_tipo_documento, td.nombre_tipo_documento FROM `usuario` u inner join celula c on c.id_celula = u.id_celula inner join rol r on r.id_rol = u.id_rol inner join tipo_documento td on td.id_tipo_documento = u.id_tipo_documento WHERE id_usuario = ?",
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

  //?Editar mi perfil =====================================================================================
router.put("/editarperfil/:id_usuario", (req, res) => {
    const { nombre, apellido, id_celula, id_tipo_documento } = req.body;
    const { id_usuario } = req.params;
    mySqlConnection.query(
      "UPDATE usuario SET nombre = ?, apellido = ?, id_celula = ?, id_tipo_documento = ? WHERE id_usuario = ?",
      [nombre, apellido, id_celula, id_tipo_documento, id_usuario],
      (err, rows, fields) => {
        if (!err) {
          res.json({ 
            status: "Usuario actualizado",
            statusCode:200 });
        } else {
          console.log(err);
        }
      }
    );
  });

module.exports = router;