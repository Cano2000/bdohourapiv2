const {zoneModel, hoursModel, usersModel, dropHoursModel, dropsModel} = require('../models/index');
const { Op } = require('sequelize');



const createZone = async (req, res) => {
  try {
    let body = req.body;
    
    const zone = await zoneModel.create(body);
    
    res.send({success: false, data:zone})
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
};

const getZones = async (req, res) => {
  try {
    const zones = await zoneModel.findAll();
    res.status(200).json({ success: true, data: zones });
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
};

const getHoursAndDrops = async (id) => {
  try {
    
    const hoursData = await hoursModel.findAll({
      where: {
        id_zone: id
      },
      include: {
        model: usersModel,
        attributes: ['user_name'] // Solo incluye el campo user_name
      }
    });

    const hoursIds = hoursData.map(hour => hour.dataValues.id_hours);
    console.log(hoursIds)

    const dropHoursData = await dropHoursModel.findAll({
      where: {
        id_hours: {
            [Op.in]: hoursIds // Usa el operador IN con los ids obtenidos
        }
    },
      include: [
        {
          model: dropsModel,
          attributes: ["id_drop", "drop_name", "img_url"]
        }
      ]
    });
    // console.log(drops)
    // if (!zone) {
    //   return res.status(404).json({ success: false, error: 'Zona no encontrado' });
    // }
    // res.status(200).json({ success: true, data: zone });
    return { hoursData, dropHoursData };
  } catch (error) {
    console.log(error)
    res.status(400).json({ success: false, error });
  }
};

async function createGroupedData(req, res) {
  const { hoursData, dropHoursData } = await getHoursAndDrops(req.params.id);

  const groupedData = hoursData.map(hour => {
      // Filtrar los drops que corresponden a esta hora específica
      const dropsForHour = dropHoursData.filter(dh => dh.id_hours === hour.id_hours).map(dh => ({
          id_drop: dh.Drop.id_drop,
          drop_name: dh.Drop.drop_name,
          img_url: dh.Drop.img_url,
          drop_quantity: dh.drop_quantity
      }));

      return {
          id_hours: hour.id_hours,
          id_zone: hour.id_zone,
          id_user: hour.id_user,
          num_hours: hour.num_hours,
          createdAt: hour.createdAt,
          updatedAt: hour.updatedAt,
          user_name: hour.User.user_name,
          drops: dropsForHour
      };
  });

  res.status(200).json({ success: true, data: groupedData });
}

const updateProducto = async (req, res) => {
  try {
    const producto = await zoneModel.update(req.body, {
      where: { ID_Producto: req.params.id }
    });
    if (producto[0] === 0) {
      return res.status(404).json({ success: false, error: 'Producto no encontrado' });
    }
    res.status(200).json({ success: true, message: 'Producto actualizado' });
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
};

const deleteProducto = async (req, res) => {
  try {
    const producto = await zoneModel.destroy({
      where: { ID_Producto: req.params.id }
    });
    if (!producto) {
      return res.status(404).json({ success: false, error: 'Producto no encontrado' });
    }
    res.status(200).json({ success: true, message: 'Producto eliminado' });
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
};

module.exports = {
    createZone,
    getZones,
    createGroupedData
}