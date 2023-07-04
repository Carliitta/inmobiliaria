const { Router } = require("express");
const Usuarios = require("../models/Usuarios.js");
const jwt = require("jsonwebtoken");
const router = Router();
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const { route } = require("./InmueblesRuta.js");

router.post("/registro", async (req, res, next) => {
  const { nombre, correo, codigo, rol, estado } = req.body;
  console.log(codigo);
  try {
    // Verifica si ya existe un usuario con el mismo correo
    const validate = await Usuarios.findOne({
      where: {
        correo: correo,
      },
    });

    if (validate) {
      return res
        .status(400)
        .send({ msg: "ya existe un usuario con el correo ingresado" });
    }
    // Crea un nuevo usuario utilizando el modelo Usuarios
    const newUser = await Usuarios.create({
      nombre,
      codigo: bcrypt.hashSync(codigo, 8),
      correo,
      rol: "user",
      estado: true,
    });

    if (!newUser) {
      return res.status(400).json({ error: "no se puedo crear el usuario" });
    }
    // Genera un token JWT
    const token = jwt.sign({ correo }, "secret");

    return res.status(200).json({ token, newUser, msg: "Usuario registrado" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  const { nombre, correo } = req.query;
  try {
    const usuarios = await Usuarios.findAll();
    //correo
    if (correo) {
      const correo_search = usuarios.filter((el) =>
        el.correo.toLowerCase().includes(correo.toLowerCase())
      );
      if (correo_search.length) {
        return res.status(200).send(correo_search);
      } else {
        return res.status(400).json({ msg: "no se encontraron datos" });
      }
    }//nombre
    if (nombre) {
      const nombre_search = usuarios.filter((el) =>
        el.nombre.toLowerCase().includes(nombre.toLowerCase())
      );
      if (nombre_search.length) {
        return res.status(200).send(nombre_search);
      } else {
        return res.status(400).json({ msg: "no se encontraron datos" });
      }
    }
      //todo
    if (usuarios.length) {
      return res.status(200).send(usuarios);
    } else {
      return res.status(400).json({ msg: "no se encontraron datos" });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// banned de user

router.put("/banned/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await Usuarios.findOne({
      where: { id: id },
    });
    if (user.estado === true) {
      await Usuarios.update({ estado: false }, { where: { id: id } });
      res.send("Usuario baneado ");
    } else {
      await Usuarios.update({ enabled: true }, { where: { id: id } });
      res.send("Usuario habiitado");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});
//user puut
router.put("/editar/:id", async (req,res)=>{
  
  try{
    const edit = await Usuarios.findOne({
      where: {
        id: req.params.id
      }
  
    });
     
    if (edit) {
    // se crea una copia de los datos del cuerpo de la solicitud usando { ...req.body } y se almacena en data.
      let data = { ...req.body }
    // se obtienen las claves (propiedades) del objeto data usando Object.keys(data).
      let keys = Object.keys(data);
   //Se itera sobre las claves utilizando keys.forEach(k => { ... }). Dentro del bucle, se asignan los valores correspondientes 
   //de data a las propiedades del objeto edit utilizando edit[k] = data[k].
      keys.forEach(k => {
        edit[k] = data[k]
      });
  
      await edit.save()
  
      res.status(200).send("Usuario modificado correctamente!")
    } else {
      res.status(404).send("not found")
    }}catch(error){
      res.status(400).json({error: error.message})
    }
})
module.exports = router;
