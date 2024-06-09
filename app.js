require("dotenv").config()
const express = require("express")
const cors = require("cors")
const app = express()
const {dbConnectMySQL} = require("./config/mysql")

app.use(cors())
app.use(express.json())

const {sequelize} = require("./config/mysql")

const Zone = require('./models/mysql/zone');
const Users = require('./models/mysql/users');
const Drops = require('./models/mysql/drops');
const Hours = require('./models/mysql/hours');
const Rol = require('./models/mysql/rol');
const DropHours = require('./models/mysql/dropHours');

Hours.belongsTo(Users, { foreignKey: 'id_user' });

Drops.belongsTo(Zone, { foreignKey: 'id_zone' });
Zone.hasMany(Drops, { foreignKey: 'id_zone' });


DropHours.belongsTo(Drops, { foreignKey: 'id_drop' });
DropHours.belongsTo(Hours, { foreignKey: 'id_hours' });

// Sincronizar modelos con la base de datos
sequelize.sync()
  .then(() => {
    console.log('Tablas sincronizadas');
  })
  .catch((error) => {
    console.error('Error al sincronizar las tablas:', error);
  });

// Añadir tus rutas aquí
app.use("/api", require('./routes'))

// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});



dbConnectMySQL()