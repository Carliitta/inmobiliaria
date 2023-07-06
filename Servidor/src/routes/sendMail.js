const { Router } = require("express");
const { Inmuebles } = require("../models/Inmuebles");
const Usuarios = require("../models/Usuarios");
const { enviarCorreo } = require("../utils/nodemailer");
const route = Router();

route.post("/soporte", async (req, res) => {
  const { nombre, correo, mensaje } = req.body;
  console.log("Datos recibidos:", nombre, correo, mensaje);
  try {
    if (!nombre || !correo || !mensaje) {
      res.status(400).send("deve rellenar todos los campos");
    } else {
      enviarCorreo(null, null, nombre, correo, mensaje, null);
      res
        .status(200)
        .send(
          "Mensaje enviado con exito!, Nos comunicaremos con usted en brevedad"
        );
    }
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

route.post("/:id", async (req, res) => {
  try {
    const { nombre, correo, mensaje, telefono } = req.body;
    const id = req.params.id;
    const inmueble = await Inmuebles.findByPk(id, {
      include: [
        {
          model: Usuarios,
        },
      ],
    });
    const propietario = inmueble.Usuario;

    if (inmueble) {
      await enviarCorreo(
        propietario,
        inmueble,
        nombre,
        correo,
        mensaje,
        telefono
      );
      res.send("Mensaje enviado con exito!");
    } else {
      res.status(404).json({ msg: "No se encontró el inmueble" });
    }
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

module.exports = route;
