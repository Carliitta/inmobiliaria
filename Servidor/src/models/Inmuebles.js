const { DataTypes } = require('sequelize');
const sequelize = require("../database/db.js")

  const Inmuebles = sequelize.define('Inmuebles', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ubicacion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fotos: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    superficie: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    precio: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    antiguedad: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fecha_publicacion: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    ambientes: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    operacion: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['venta', 'alquiler']],
      },
    },
  }, {
    timestamps: false
  });


  
module.exports = Inmuebles;
