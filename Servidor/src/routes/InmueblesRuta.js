const { Router } = require("express");
const route = Router();
const { Op, where } = require("sequelize");
const {Inmuebles, Fotos} = require("../models/Inmuebles.js");
const Propiedad = require("../models/Propiedad.js");
const Provincias = require("../models/Provincias.js");
const Usuarios = require("../models/Usuarios.js")

route.get("/", async (req, res) => {
  const { ubicacion } = req.query;
  try {
    const inmuebles = await Inmuebles.findAll({
      include: [
        {
          model: Fotos,
          as: 'fotos', // Especifica el alias utilizado en la asociación
        },
        {
          model: Provincias,
        },
        {
          model: Propiedad,
        },
        {
          model: Usuarios,
        },
      ],
    });

    if (ubicacion) {
      const busqueda = inmuebles.filter((el) =>
        el.ubicacion.toLowerCase().includes(ubicacion.toLowerCase())
      );
      busqueda.length
        ? res.status(200).json(busqueda)
        : res.status(400).json("no se encontraron datos");
    } else {
       const data = await inmuebles.map((i) => {
      return {
        id: i.id,
        titulo: i.titulo,
        descripcion: i.descripcion,
        ambientes: i.ambientes,
        superficie: i.superficie,
        antiguedad:i.antiguedad,
        fecha:i.fecha_publicacion,
        ubicacion:i.ubicacion,
        operacion:i.operacion,
        precio: i.precio,
        fotos: i.fotos[0],
        propiedad: i.Propiedad.nombre,
        provincia: i.Provincia.nombre_prov,
        usuario:i.Usuario
       
      };
    }); 
 
      data.length
        ? res.status(200).json(data)
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
   const InmuebleCreate = await Inmuebles.create({ titulo,
      ubicacion,
      precio,
      descripcion,
      superficie,
      fotos,
      antiguedad,
      ambientes,
      operacion,
      fecha_publicacion:Date.now()})

// Asociar las fotos al inmueble
for (const fotoUrl of fotos) {
  await Fotos.create({ url: fotoUrl, inmuebleId: InmuebleCreate.id });
}

     // Asociar provincia, propiedad y usuario si se proporcionaron los IDs
     if (provinciaId) {
      const provincia = await Provincias.findByPk(provinciaId);
      if (provincia) {
        await InmuebleCreate.setProvincia(provincia);
      }
    }

    if (propiedadId) {
      const propiedad = await Propiedad.findByPk(propiedadId);
      if (propiedad) {
        await InmuebleCreate.setPropiedad(propiedad);
      }
    }

    if (usuarioId) {
      const usuario = await Usuarios.findByPk(usuarioId);
      if (usuario) {
        await InmuebleCreate.setUsuario(usuario);
      }
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
    const detalle = await Inmuebles.findByPk(id, {
      include: [
        {
          model: Fotos,
          as: 'fotos', // Especifica el alias utilizado en la asociación
        },
        {
          model: Provincias,
        },
        {
          model: Propiedad,
        },
        {
          model: Usuarios,
        },
      ],
    });

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
