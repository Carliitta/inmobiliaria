const { Router } = require("express");
const route = Router();
const { Op, where } = require("sequelize");
const Inmuebles = require("../models/Inmuebles.js");
const Propiedad = require("../models/Propiedad.js");
const Provincias = require("../models/Provincias.js");
const Usuarios = require("../models/Usuarios.js")

route.get("/", async (req, res) => {
  const { ubicacion } = req.query;
  try {
    const inmuebles = await Inmuebles.findAll(
    );
    if (ubicacion) {
      const busqueda = inmuebles.filter((el) =>
        el.ubicacion.toLowerCase().includes(ubicacion.toLowerCase())
      );
      busqueda.length
        ? res.status(200).json(busqueda)
        : res.status(400).json("no se encontraron datos");
    } else {
      inmuebles.length
        ? res.status(200).json(inmuebles)
        : res.status(400).json({ msg: "La base de datos esta vacia" });
    }
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});
//POST INMUEBLE
route.post("/publicar", async (req, res) => {
  const {
  
    titulo,
    ubicacion,
    precio,
    descripcion,
    superficie,
    fotos,
    antiguedad,
    ambientes,
    operacion,
    propiedadId,
    provinciaId,
    usuarioId,
    fecha_publicacion
  } = req.body;
  try {
   const create = await Inmuebles.create({ titulo,
      ubicacion,
      precio,
      descripcion,
      superficie,
      fotos,
      antiguedad,
      ambientes,
      operacion,
      fecha_publicacion:Date.now()})

      let provincia = null;
    if (provinciaId !== undefined) {
      provincia = await Provincias.findOne({
        where: {
          id: provinciaId
        }
      });
    }

    let propiedad = null;
    if (propiedadId !== undefined) {
      propiedad = await Propiedad.findOne({
        where: {
          id: propiedadId
        }
      });
    }

    let usuario = null;
    if (usuarioId !== undefined) {
      usuario = await Usuarios.findOne({
        where: {
          id: usuarioId
        }
      });
    }

   // console.log(provincia, propiedad, usuario);

    if (provincia) {
      create.setProvincia(provincia);
    }

    if (propiedad) {
      create.setPropiedad(propiedad);
    }

    if (usuario) {
      create.setUsuario(usuario);
    }

      res.status(200).json("Publicado Correctamente!")
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});
//put inmueble
route.put("/:id", async (req, res) => {
 
  try{
    const selectedinmueble = await Inmuebles.findOne({
      where: {
        id: req.params.id
      }
  
    });
    // Si se encuentra el inmueble (selectedinmueble), se procede a actualizarlo.  
    if (selectedinmueble) {
    // se crea una copia de los datos del cuerpo de la solicitud usando { ...req.body } y se almacena en data.
      let data = { ...req.body }
    // se obtienen las claves (propiedades) del objeto data usando Object.keys(data).
      let keys = Object.keys(data);
   //Se itera sobre las claves utilizando keys.forEach(k => { ... }). Dentro del bucle, se asignan los valores correspondientes 
   //de data a las propiedades del objeto selectedinmueble utilizando selectedinmueble[k] = data[k].
      keys.forEach(k => {
        selectedinmueble[k] = data[k]
      });
  
      await selectedinmueble.save()
  
      res.status(200).send(selectedinmueble)
    } else {
      res.status(404).send("not found")
    }}catch(error){
      res.status(400).json({error: error.message})
    }
});

route.get("/:id", async (req,res)=>{
  const {id}= req.params
  try {
    const detalle = await Inmuebles.findByPk(id)
    if (detalle) {
      res.status(200).send(detalle);
    } else {
      res.status(404).json({ msg: "No se encontró el inmueble" });
    }
  } catch (error) {
    res.status(400).json({error: error.message})
  }
})

module.exports = route;
