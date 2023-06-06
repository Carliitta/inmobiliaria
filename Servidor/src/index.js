const app = require("./app")
const sequelize

= require("./database/db.js")
const  Usuarios = require("./models/Usuarios.js")  // importo  cada modelo
const  Propiedad = require("./models/Propiedad.js")
const  Provincias = require("./models/Provincias.js")
const  Inmuebles = require("./models/Inmuebles.js")

//script para cargar datos a la Db por las dudas :x
const initiateTables = async () => {
    let usuarios=[
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
    }
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
     const inmuebles = [
        // Inmueble 1
        {
          titulo: "Terreno con rancho",
          descripcion: "Casa en dos plantas, rodeada de áreas verdes en excelente estado de conservación, en Planta Baja, terraza con barra, Cocina, alacena sala amplia, comedor, cuarto de máquinas y 2 Recámaras con Baño completo y Closet.",
          ubicacion: "guaraypo s/n",
          fotos: "https://img10.naventcdn.com/avisos/18/00/56/69/13/18/1200x1200/134626070.jpg",
          superficie: 5135,
          precio: 6000,
          antiguedad: "5 años",
          ambientes: 8,
          operacion: "venta",
          propiedadId: 2,
          usuarioId: 2,
          provinciaId: 13
        },
        // Inmueble 2
        {
          titulo: "Departamento céntrico",
          descripcion: "Hermoso departamento en el centro de la ciudad, con amplios espacios y excelente iluminación. Cuenta con 3 dormitorios, 2 baños, cocina equipada y sala de estar. Ideal para vivir en familia.",
          ubicacion: "Av. Principal 123",
          fotos: "https://blog.nexoinmobiliario.pe/wp-content/uploads/2021/12/ideas-decorar-balcon-departamento.jpg",
          superficie: 120,
          precio: 80000,
          antiguedad: "10 años",
          ambientes: 4,
          operacion: "alquiler",
          propiedadId: 3,
          usuarioId: 1,
          provinciaId: 6
        },
        // Inmueble 3
        {
          titulo: "Terreno en zona residencial",
          descripcion: "Lote de terreno en una exclusiva zona residencial, rodeado de naturaleza y con hermosas vistas. Ideal para construir la casa de tus sueños.",
          ubicacion: "Calle Los Robles",
          fotos: "https://solopropiedades.com/wp-content/uploads/WPL/43975/img_20200214_165424.jpg",
          superficie: 800,
          precio: 120000,
          antiguedad: "Nuevo",
          ambientes: 0,
          operacion: "venta",
          propiedadId: 1,
          usuarioId: 1,
          provinciaId: 19
        },
           // Inmueble 4
           {
            titulo: "Casa de madera",
            descripcion: "Encantadora casita de madera en venta, con diseño acogedor y estilo rústico. Perfecta para disfrutar de la tranquilidad y la naturaleza. Cuenta con todas las comodidades necesarias en sus 180 metros cuadrados. ¡No pierdas la oportunidad de tener tu refugio soñado",
            ubicacion: "Barrio industrial 908",
            fotos: "https://www.invico.gov.ar/Content/imagenes/vivienda%20de%20madera/madera2.jpg",
            superficie: 1500,
            precio: 8000,
            antiguedad: "1 año",
            ambientes: 3,
            operacion: "venta",
            propiedadId: 1,
            usuarioId: 1,
            provinciaId: 11
          },
        // Agrega más inmuebles aquí
      ];
      
    
     for (let i = 0; i < inmuebles.length; i++) {
        const inmueble = inmuebles[i];
    
        // Realizar las operaciones necesarias para agregar el inmueble a la base de datos
        await Inmuebles.findOrCreate({
          where:{

            titulo: inmueble.titulo,
            descripcion: inmueble.descripcion,
            ambientes: inmueble.ambientes,
            superficie: inmueble.superficie,
            antiguedad: inmueble.antiguedad,
            fecha_publicacion: Date.now(),
            ubicacion: inmueble.ubicacion,
            operacion: inmueble.operacion,
            precio: inmueble.precio,
            fotos: inmueble.fotos,
            propiedadId: inmueble.propiedadId,
            provinciaId: inmueble.provinciaId,
          }

        });
      }
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