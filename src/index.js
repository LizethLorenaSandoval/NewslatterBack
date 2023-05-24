const { response } = require("express");
const express = require("express"); // import express
const app = express(); // create express app
const cors = require("cors");

app.set("port", process.env.PORT || 3000); // set the port
const whiteList = ["http://localhost:3000"];

app.use(express.json()); // for parsing application/json

app.use(cors()); //esta vaina es para politicas de cors

app.listen(app.get("port"), () => {
  console.log("")
  console.log("")
  console.log("*****************************************************");
  console.log("*   🖥️  Servidor establecido en el puerto:", app.get("port") , "🖥️   *");
}); //poner en el puerto 3000



//estas son las rutas para hacer uso de cada una de las tablas

//? Página inicial
app.use(require("./apis/initialPage"));

//? celula
app.use(require("./apis/celula"));

//? estado nota
app.use(require("./apis/estado_nota"));

//? estado rol
app.use(require("./apis/estado_rol"));

//? imagenesapp
app.use(require("./apis/imagenesapp"));

//? nota
app.use(require("./apis/nota"));

//? rol
app.use(require("./apis/rol"));

//? Tipo documento
app.use(require("./apis/tipo_documento"));

//? Usuario
app.use(require("./apis/usuario"));

//? Autenticación
app.use(require("./apis/auth/registrarse"));
//? Registrarse
app.use(require("./apis/auth/iniciarsesion"));