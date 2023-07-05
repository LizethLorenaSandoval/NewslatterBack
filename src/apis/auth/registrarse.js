const express = require("express");
const router = express.Router();
const mySqlConnection = require("../../conexion");
const bcryptjs = require("bcrypt");

//? Crear/Registrar un usuario =====================================================================================
router.post("/registrarse", (req, res) =>{
  // Valida el correo
  const {correo} = req.body;
  mySqlConnection.query(
    "select * from usuario where correo = ?",
    [correo],
    (err, rows, fields) => {
      if (!err) {
        if (rows.length >= 1) {
          res.json({
            status: "Ya hay un usuario registrado con el correo: "+correo, 
            statusCode: 403,
          });
        } else {
          //* Si no hay usuarios registrados con el correo, valida el documento
            validDoc();
        }
      } else {
        console.log(err);
      }
    }
  )

  const validDoc = () => { 
    // Valida el documento
    const {documento} = req.body;
    const query =
    "select * from usuario where documento = ?";
    mySqlConnection.query(
      query,
      [documento],
      (err, rows, fields) => {
        if (!err) {
          if (rows.length >= 1) {
            res.json({
              status: "Ya hay un usuario registrado con el documento: "+documento,
              statusCode: 403,
            });
          } else {
            //* Si no hay usuarios registrados con el documento, crea el usuario
            registrarUsuario();
          }
        } else {
          console.log(err);
        }
      }
    )
    
  }

  const registrarUsuario = () => {
    const {nombre, apellido, documento, id_celula, id_tipo_documento, correo, contrasena} = req.body;
    const hash = bcryptjs.hashSync(contrasena, 10); // Encripta el password
    const query =
    "insert into usuario (nombre, apellido, documento, id_celula, id_tipo_documento, correo, contrasena) values (?,?,?,?,?,?,?)";
    mySqlConnection.query(
      query,
      [nombre, apellido, documento, id_celula, id_tipo_documento, correo, hash],
      (err, rows, fields) => {
        if (!err) {
          res.json({
            status:200,
            message: "Usuario creado"
          })
        } else {
          console.log(err);
        }
      }
    )
  }
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