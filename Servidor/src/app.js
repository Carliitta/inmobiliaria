const express =require("express") ;
const morgan= require("morgan") ;
const  cors =require("cors") 
const  rutaInmuebles  = require("../src/routes/InmueblesRuta.js") 
const rutaUsuarios = require("../src/routes/UsersRoute.js")
const rutaLogin = require("../src/routes/login.js")
const rutaProv = require("../src/routes/ProvinciasRuta.js")
const rutaProp = require("../src/routes/propiedadRuta.js")
const app= express()
//cors=es una característica de seguridad del navegador que restringe las solicitudes HTTP.
app.use(cors())

// Middlewares
app.use(morgan("dev"));
app.use(express.json()) //interpreta datos enviados en formato json
//rutas
app.use("/inmuebles", rutaInmuebles)
app.use("/usuarios", rutaUsuarios)
app.use("/login", rutaLogin)
app.use("/provincias", rutaProv)
app.use("/propiedad", rutaProp)

module.exports= app;