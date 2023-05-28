const { DataTypes } = require('sequelize');
const sequelize = require("../database/db.js")

  const Provincias = sequelize.define('Provincias', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre_prov: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    timestamps: false
  });
   

module.exports = Provincias
