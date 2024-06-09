const { DataTypes } = require('sequelize');
const {sequelize} = require("../../config/mysql")
const Zone = require("./zone")
const Users = require("./users")

const Hours = sequelize.define('Hours', {
        id_hours: {
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
        id_user: {
            type: DataTypes.INTEGER,
            references: {
                model: Users,
                key: 'id_user'
              },
            allowNull: false
        },
        num_hours: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        tableName: 'Hours',
        updatedAt: true,
        createdAt: true
  });

    

module.exports = Hours;