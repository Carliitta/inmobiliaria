const { DataTypes} = require('sequelize');
const sequelize = require("../database/db.js")

 const user = sequelize.define('Usuarios', {
    id: {
      type: DataTypes.INTEGER,
     autoIncrement:true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    correo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    codigo: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
      estado: {
      type: DataTypes.BOOLEAN,
      defaultValue:true,
      allowNull: false,
    },
    rol:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['admin', 'user']],
      },
    }
  }, {
    timestamps: false
  });

module.exports = user







