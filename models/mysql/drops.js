const { DataTypes } = require('sequelize');
const {sequelize} = require("../../config/mysql")
const Zone = require("./zone")

const Drop = sequelize.define('Drop', {
        id_drop: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_zone: {
            type: DataTypes.INTEGER,
            references: {
                model: Zone,
                key: 'id_zone'
              },
            allowNull: false
        },
        drop_name: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        img_url: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    }, {
        tableName: 'Drop',
        updatedAt: true,
        createdAt: true
  });

module.exports = Drop;