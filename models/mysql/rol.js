const { DataTypes } = require('sequelize');
const {sequelize} = require("../../config/mysql")

const Rol = sequelize.define('Rol', {
        id_rol: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        rol_name: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    }, {
        tableName: 'Rol',
        updatedAt: true,
        createdAt: true
  });

module.exports = Rol;