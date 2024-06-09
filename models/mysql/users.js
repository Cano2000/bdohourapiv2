const { DataTypes } = require('sequelize');
const {sequelize} = require("../../config/mysql")

const Users = sequelize.define('Users', {
        id_user: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_name: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            select: false
        },
    }, {
        tableName: 'Users',
        updatedAt: true,
        createdAt: true
  });

module.exports = Users;