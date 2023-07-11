const express = require("express");
const router = express.Router();
const mySqlConnection = require("../../conexion");
const bcryptjs = require("bcrypt");
const jwt = require("jsonwebtoken");

//? Iniciar sesión =====================================================================================

router.post("/iniciarsesion", async (req, res) => {
    function compare(correo, contrasena, userRegistered) {
      let compare = bcryptjs.compareSync(
        contrasena,
        userRegistered[0].contrasena
      );
      if (compare) {

        jwt.sign(
          {
            correo: correo,
            contrasena: userRegistered[0].contrasena,
            id_usuario: userRegistered[0].id_usuario,
            id_rol: userRegistered[0].id_rol,
            id_estado_usuario:userRegistered[0].id_estado_usuario,
            status: "Login exitoso",
            statusCode: 200,
          },
          "secretkey",
          (err, token) => {
            res.json({
              correo: correo,
              contrasena: userRegistered[0].contrasena,
              id_usuario: userRegistered[0].id_usuario,
              id_rol: userRegistered[0].id_rol,
              id_estado_usuario:userRegistered[0].id_estado_usuario,
              token: token,
              status: "Login exitoso",
              statusCode: 200
            });
          }
        );
      } else {
        res.json({
          status: "Credenciales incorrectas",
          statusCode: 403,
        });
      }
    }
  
    const { correo, contrasena } = req.body;
    mySqlConnection.query(
      "SELECT * FROM usuario WHERE correo = ? ",
      [correo],
      (err, rows, fields) => {
        if (!err) {
          if (rows.length >= 1) {
            compare(correo, contrasena, rows);
          } else {
            res.json({
              status: "No se encuentra ningún usuario registrado con ese correo",
              statusCode: 203,
            });
          }
        } else {
          console.log(err);
        }
      }
    );
  });

module.exports = router;