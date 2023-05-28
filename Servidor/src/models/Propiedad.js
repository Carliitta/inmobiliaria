const { DataTypes } = require('sequelize');
const sequelize = require("../database/db.js")

  const Propiedad = sequelize.define('Propiedad', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
   
  }, {
    timestamps: false
  });

  module.exports = Propiedad


