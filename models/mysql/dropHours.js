const { DataTypes } = require('sequelize');
const {sequelize} = require("../../config/mysql")
const Drops = require("./drops")
const Hours = require("./hours")

const DropHours = sequelize.define('DropHours', {
        id_drop: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: Drops,
                key: 'id_drop'
            },
            allowNull: false
        },
        id_hours: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: Hours,
                key: 'id_hours'
            },
            allowNull: false
        },
        drop_quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
    }, {
        tableName: 'DropHours',
        updatedAt: true,
        createdAt: true
  });


    

module.exports = DropHours;