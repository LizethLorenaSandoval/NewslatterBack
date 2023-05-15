const express = require("express");
const router = express.Router();
const mySqlConnection = require("../../conexion");
const bcryptjs = require("bcrypt");

//? Iniciar sesión =====================================================================================

router.post("/iniciarsesion", async (req, res) => {
    function compare(correo, contrasena, userRegistered) {
      let compare = bcryptjs.compareSync(
        contrasena,
        userRegistered[0].contrasena
      );
      if (compare) {
        res.json(
          {
            correo: correo,
            contrasena: userRegistered[0].contrasena,
          },
          "secretkey",
          (err, token) => {
            res.json({
              status: "Login exitoso",
              statusCode: 200,
              userId: userRegistered[0].documento,
              estado:userRegistered[0].estado,
              token: token,
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