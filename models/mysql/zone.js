const { DataTypes } = require('sequelize');
const {sequelize} = require("../../config/mysql")

const Zone = sequelize.define('Zone', {
    id_zone: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name_zone: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    img_url: {
        type: DataTypes.TEXT,
        allowNull: false
    }
    }, {
        tableName: 'Zone',
        updatedAt: true,
        createdAt: true
  });

module.exports = Zone;