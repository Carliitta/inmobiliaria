const app = require("./app")
const sequelize

= require("./database/db.js")
const  Usuarios = require("./models/Usuarios.js")  // importo  cada modelo
const  Propiedad = require("./models/Propiedad.js")
const  Provincias = require("./models/Provincias.js")
const  {Inmuebles} = require("./models/Inmuebles.js")

//script para cargar datos a la Db por las dudas :x
const initiateTables = async () => {
   /*  let usuarios=[
        {
            nombre:'carlii',
            codigo:"4092",
            correo:"carlii@gmail.com",
            rol:"admin"
       },
       {
        nombre:'Juaniitoo',
        codigo:"5555",
        correo:"juanito@gmail.com",
        rol:"user"
   },
           
    ]
    for (let i = 0; i < usuarios.length; i++) {
        const user = usuarios[i];
    
        // Realizar las operaciones necesarias para agregar el user a la base de datos
        await Usuarios.findOrCreate({
          where:{
            nombre: user.nombre,
            codigo: user.codigo,
            correo: user.correo,
            rol:user.rol

          }
        })
    } */
    //-------------------------------//
    let provincias = [
      {nombre_prov:'Buenos Aires'}, 
      {nombre_prov:'Catamarca'}, 
      {nombre_prov:'Chaco'}, 
      {nombre_prov:'Chubut'}, 
      {nombre_prov:'Córdoba'}, 
      {nombre_prov:'Corrientes'}, 
      {nombre_prov:'Entre Ríos'},
      {nombre_prov:'Formosa'},
      {nombre_prov:'Jujuy'},
      {nombre_prov:'La Pampa'},
      {nombre_prov: 'La Rioja'},
      {nombre_prov:'Mendoza'},
      {nombre_prov: 'Misiones'},
      {nombre_prov:'Neuquén'},
      {nombre_prov:'Río Negro'},
      {nombre_prov:'Salta'},
      {nombre_prov: 'San Juan'},
      {nombre_prov:'San Luis'},
      {nombre_prov: 'Santa Cruz'},
      {nombre_prov:'Santa Fe'},
      {nombre_prov: 'Santiago del Estero'},
      {nombre_prov:'Tierra del Fuego'},
      {nombre_prov: 'Tucumán'}
  
    ];
    
    for(let index in provincias){
       //console.log( provincias[index].nombre_prov);
      await Provincias.findOrCreate(
          {
              where: {
                nombre_prov : provincias[index].nombre_prov
              }
          }
      )
    }
    //---------------------------------------//
    let propiedad = [
        {nombre:'Casa'}, 
        {nombre:'Terreno'}, 
        {nombre:'Departamento'}, 
        {nombre:'Campo'}, 
        {nombre:'Local'}, 
        {nombre:'Galpon'}, 
    ]
    for(let index in propiedad){
       await Propiedad.findOrCreate(
           {
               where: {
                 nombre: propiedad[index].nombre
               }
           }
       )
     }
     //-------------------------------------//
  
      
    
}

async function main () {
    try {

        await sequelize.sync({force:false});   //para sincronizar con la base de datos y crear las tablas
        initiateTables();  //inserta los datos a la db
        console.log("la conexion fue establecida ")
        app.listen(3001)
        console.log("Servidor escuchando en el puerto 3001")
        
    } catch (error) {
        console.log("error de conexion ",error)
    }

}
//aca realizo las relaciones entre las tablas

// Inmuebles -> Propiedad (uno a uno)
Inmuebles.belongsTo(Propiedad, { foreignKey: 'propiedadId' });
Propiedad.hasOne(Inmuebles, { foreignKey: 'propiedadId' });

// Inmuebles -> Usuarios (uno a uno)
Inmuebles.belongsTo(Usuarios, { foreignKey: 'usuarioId' });
Usuarios.hasOne(Inmuebles, { foreignKey: 'usuarioId' });

// Inmuebles -> Provincias (uno a uno)
Inmuebles.belongsTo(Provincias, { foreignKey: 'provinciaId' });
Provincias.hasOne(Inmuebles, { foreignKey: 'provinciaId' });

main();
module.exports={
    Inmuebles,Usuarios,Provincias,Propiedad
}