const jwt = require('jsonwebtoken');
const { JWT_SECRET }= process.env
//1.Se define la función generateToken que toma un objeto user como argumento.
//2.se utiliza el método jwt.sign para firmar el token. Se pasa un objeto con los datos
// del usuario que se incluirán en el token, en este caso, el id y el correo.
 const generateToken = (user) => {
    return jwt.sign(
        {
            id:user.id,
            correo: user.correo,
            
        }, 
//3.se pasa la clave secreta JWT_SECRET y se establece una opción expiresIn para especificar la caducidad del token
        JWT_SECRET, 
        {
            expiresIn: '7d'
        }
    )
};
//4.El resultado de jwt.sign es el token JWT generado.
module.exports ={
    generateToken
}