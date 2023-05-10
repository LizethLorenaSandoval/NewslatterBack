const express = require("express");
const router = express.Router();
const mySqlConnection = require("../../conexion");
const bcryptjs = require("bcrypt");

//? Validación para registrarse =====================================================================================
router.post("/registrarse", (req, res) => {
    //* Si no hay usuarios registrados con ese correo, lo deja registrarse (o crear)
    const { correo, documento } = req.body;
    mySqlConnection.query(
      "SELECT * FROM usuario WHERE correo = ? or documento = ?",
      [ correo, documento ],
      (err, rows, fields) => {
        if (!err) {
          if (rows.length >=1) {
            res.json({
              status: "Ya hay un usuario registrado con ese correo o documento",
              statusCode:403,
              data: rows
            });
          } else {
            registerUser();
          }
        } else {
          console.log(err);
        }
      }
    );
  


    //* Función para registrar el usuario
    const registerUser = () => {
      const { nombre, apellido, documento, id_celula, id_tipo_documento, correo, contrasena } = req.body;
      const hash = bcryptjs.hashSync(contrasena, 15);
      const query =
        "INSERT INTO usuario (nombre, apellido, documento, id_celula, id_tipo_documento, correo, contrasena) VALUES (?,?,?,?,?,?,?)";
      mySqlConnection.query(
        query,
        [nombre, apellido, documento, id_celula, id_tipo_documento, correo, hash],
        (err, rows, fields) => {
          if (!err) {
            res.json({ 
              status: 200, 
              message: "Usuario registrado"});
              
          } else {
            console.log(err);
          }
        }
      );
    };
  });


//   post json para registrar desde postman
// {
//   "nombre":"lore",
//   "apellido":"sandoval",
//   "documento":"1",
//   "id_celula":1,
//   "id_tipo_documento":"2",
//   "correo":"lizeth.sandoval@btgpactual.com",
//   "contrasena":"12345"
// }

module.exports = router;