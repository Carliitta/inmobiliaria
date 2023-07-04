const nodemailer = require("nodemailer");

// Configuración de transporte de correo
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", // Reemplaza con el servidor de correo saliente que estés utilizando
  port: 465, // Puerto del servidor de correo saliente
  secure: true, // Establece a true si estás utilizando SSL/TLS
  auth: {
    user:process.env.CORREO, // Reemplaza con tu dirección de correo electrónico
    pass:process.env.PASS // Reemplaza con tu contraseña de correo electrónico
  },
});

const enviarCorreo = (propietario, Inmueble, nombre, correo, mensaje, telefono) => {
  // Configura los detalles del correo electrónico
  console.log("correo", propietario?.correo);
  if (propietario) {
    const mailOptions = {
      from: correo,
      to: `${propietario.correo}`,
      subject: 'Quiero más información',
      html: `<!DOCTYPE html>
        <html>
          <head></head>
          <body style="background-color: rgb(8, 167, 69);">
            <center>
              <a href="http://localhost:3000" style="font-size: xxx-large; text-decoration: none;color: azure;">INMOLANDIA</a>
            </center>
            <div style="text-align: center; background-color: rgb(34, 216, 240); padding: 30px;">
              <h2>Estimad@ ${propietario.nombre},</h2>
              <h4>Tiene una consulta sobre su publicación:</h4>
              <h4>ID del Inmueble: ${Inmueble.id}</h4>
              <h4>Título: ${Inmueble.titulo}</h4>
              <hr>
              <p><b>Mensaje: </b></p>
              <p>${mensaje}</p>
              <hr>
              <h3>Datos del consultante: </h3>
              <p><b>Nombre:</b> ${nombre}</p>
              <p><b>Teléfono:</b> ${telefono}</p>
              <p><b>Correo:</b> ${correo}</p>
              <br>
              <p>Atentamente, INMOLANDIA</p>
              <p>Si tienes algún problema no dudes en contactarnos, InmoLandia@gmail.com</p>
            </div>
          </body>
        </html>`
    };

    // Envía el correo electrónico
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error al enviar el correo electrónico:", error);
      } else {
        console.log("Correo electrónico enviado:", info.response);
      }
    });
  } else {
    console.log(correo);
    const mailOptions = {
      from:`${correo}` ,
      to: process.env.CORREO,
      subject: 'centro de soporte',
      html: `<!DOCTYPE html>
        <html>
          <head></head>
          <body style="background-color: rgb(8, 167, 69);">
            <center>
              <a href="http://localhost:3000" style="font-size: xxx-large; text-decoration: none;color: azure;">INMOLANDIA</a>
            </center>
            <div style="text-align: center; background-color: rgb(34, 216, 240); padding: 30px;">
              <h2>Soporte:</h2>
              <h4>Tiene una nueva consulta</h4>
              <hr>
              <p><b>Consulta:</b></p>
              <p>${mensaje}</p>
              <hr>
              <h3>Datos del consultante: </h3>
              <p><b>Nombre:</b> ${nombre}</p>
              <p><b>Correo:</b> ${correo}</p>
              <br>
              <p>Atentamente, ${nombre}</p>
            </div>
          </body>
        </html>`
    };

    // Envía el correo electrónico
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error al enviar el correo electrónico:", error);
      } else {
        console.log("Correo electrónico enviado:", info.response);
      }
    });
  }
};

module.exports = { enviarCorreo };
