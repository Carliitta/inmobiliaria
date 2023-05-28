const { Router } = require("express");
const Usuarios = require("../models/Usuarios");
const { generateToken } = require("../utils/generadorToken");
const bcrypt = require("bcrypt");
const router = Router();
router.post("/", async (req, res) => {
  const { correo, codigo } = req.body;

  const user = await Usuarios.findOne({
    where: { correo: correo },
  });

  if (!user) {
    return res.status(400).send({ message: "el correo es invalido " });
  }

  if (!user.estado) {
    return res
      .status(400)
      .send({
        message:
          "Tu usuario se encuantra desabilitado, por favor contactar con el administrador.",
      });
  }

  if (!user || !user.codigo)
    return res.status(400).send({ message: "correo o contraseña es invalido" });
  //Si el código proporcionado coincide con el hash almacenado en la base de datos (usando bcrypt.compareSync), 
  //se devuelve una respuesta exitosa con un mensaje de validación correcta, 
  //los datos del usuario y un token generado utilizando la función generateToken:
  if (bcrypt.compareSync(codigo, user.codigo)) {
    return res.status(200).json({
      message: "validado correctamente!",
      //Los datos del usuario se expanden utilizando el operador spread (...user) para incluir todas las propiedades del objeto user.
      data: {
        ...user,
        token: generateToken(user),
      },
    });
  } else
    return res.status(401).send({ message: "Email or Password is invalid" });
});

module.exports = router;
