const { Router } = require("express");
const route = Router();
const { Op, where } = require("sequelize");
const { Inmuebles, Fotos } = require("../models/Inmuebles.js");
const Propiedad = require("../models/Propiedad.js");
const Provincias = require("../models/Provincias.js");
const Usuarios = require("../models/Usuarios.js");

route.get("/", async (req, res) => {
  const { ubicacion } = req.query;
  try {
    const inmuebles = await Inmuebles.findAll({
      include: [
        {
          model: Fotos,
          as: "fotos", // Especifica el alias utilizado en la asociación
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
      /*  const data = await inmuebles?.map((i) => {
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
        usuario:i.Usuario.id
       
      }; */

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
    fecha_publicacion,
  } = req.body;

  try {
    const InmuebleCreate = await Inmuebles.create({
      titulo,
      ubicacion,
      precio,
      descripcion,
      superficie,
      antiguedad,
      ambientes,
      operacion,
      fecha_publicacion: Date.now(),
    });

    // Crear y asociar las fotos al inmueble
    const fotosCreatePromises = fotos.map(async (fotoUrl) => {
      try {
        const foto = await Fotos.create({ url: fotoUrl });
        return foto;
      } catch (error) {
        // Manejar cualquier error que pueda ocurrir al crear la foto
        console.error("Error al crear la foto:", error.message);
      }
    });

    // Esperar a que se completen todas las promesas de creación de fotos
    const fotosCreadas = await Promise.all(fotosCreatePromises);
    await InmuebleCreate.setFotos(fotosCreadas);
    // Asociar las fotos creadas al inmueble

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

    res.status(200).json("Publicado Correctamente!");
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

//put inmueble
route.put("/:id", async (req, res) => {
  try {
    const selectedinmueble = await Inmuebles.findOne({
      where: {
        id: req.params.id,
      },
    });
    // Si se encuentra el inmueble (selectedinmueble), se procede a actualizarlo.
    if (selectedinmueble) {
      // se crea una copia de los datos del cuerpo de la solicitud usando { ...req.body } y se almacena en data.
      let data = { ...req.body };
      // se obtienen las claves (propiedades) del objeto data usando Object.keys(data).
      let keys = Object.keys(data);
      //Se itera sobre las claves utilizando keys.forEach(k => { ... }). Dentro del bucle, se asignan los valores correspondientes
      //de data a las propiedades del objeto selectedinmueble utilizando selectedinmueble[k] = data[k].
      keys.forEach((k) => {
        selectedinmueble[k] = data[k];
      });

      await selectedinmueble.save();

      res.status(200).send(selectedinmueble);
    } else {
      res.status(404).send("not found");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

route.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const detalle = await Inmuebles.findByPk(id, {
      include: [
        {
          model: Fotos,
          as: "fotos", // Especifica el alias utilizado en la asociación
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
    res.status(400).json({ error: error.message });
  }
});

route.get("/publicaciones/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const publicacion = await Inmuebles.findAll({
      include: [
        {
          model: Fotos,
          as: "fotos",
        },
      ],
      where: {
        usuarioId: id,
      },
    });
    const primeraFoto = publicacion[0].fotos[0];
    const urlFoto = primeraFoto.url;
    const datosPublicacion = [];

    for (let i = 0; i < publicacion.length; i++) {
      datosPublicacion.push(publicacion[i]);
    }

    res.status(200).json(datosPublicacion);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

route.delete("/publicaciones/:id", async (req, res) => {
  try {
    const publicacion = Inmuebles.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json({ msg: "Publicacion eliminada con exito!" });
  } catch (error) {
    res.status(400).json({ msg: "Error al eliminar publicacion " });
  }
});

// Ruta para eliminar una foto de un inmueble
route.delete("/:inmuebleId/fotos/:fotoId", async (req, res) => {
  try {
    const inmuebleId = req.params.inmuebleId;
    const fotoId = req.params.fotoId;

    // Verificar si el inmueble existe
    const inmueble = await Inmuebles.findByPk(inmuebleId);
    if (!inmueble) {
      return res.status(404).send("Inmueble not found");
    }

    // Verificar si la foto existe y pertenece al inmueble
    const foto = await Fotos.findOne({
      where: {
        id: fotoId,
        inmuebleId: inmuebleId,
      },
    });
    if (!foto) {
      return res.status(404).send("Foto not found");
    }

    // Eliminar la foto
    await foto.destroy();

    res.status(200).send("Foto deleted");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = route;
