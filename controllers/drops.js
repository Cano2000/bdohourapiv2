const {dropsModel, dropHoursModel, zoneModel} = require('../models/index');

const insertDrop = async (req, res) => {
  try {
    await dropHoursModel.bulkCreate(req.body);
    res.status(200).json({ success: true})
  } catch (error) {
    console.error('Error al insertar valores:', error);
  }
};

const createDrop = async (req, res) => {
  try {
    const body = req.body
    
    const zones = await dropsModel.create(body);
    res.status(200).json({ success: true, data: zones });
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
};
const getDrops = async (req, res) => {
  try {
    const drops = await dropsModel.findAll({
      include: {
        model: zoneModel,
        attributes: ['name_zone']
      },
      order: [['id_zone', 'ASC']]
    });
    res.status(200).json({ success: true, data: drops });
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
};

const getDropsByZone = async (req, res) => {
  try {
    const info = req.params
    const drops = await dropsModel.findAll({
        where: {
          id_zone: info.id
        }
      });
    if (!drops) {
      return res.status(404).json({ success: false, error: 'Zona no encontrado' });
    }
    res.status(200).json({ success: true, data: drops });
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
};

const getDropsByHour = async (req, res) => {
  try {
    const info = req.params
    const drops = await dropHoursModel.findAll({
        where: {
          id_hours: info.id
        }
      });
    if (!drops) {
      return res.status(404).json({ success: false, error: 'Zona no encontrado' });
    }
    res.status(200).json({ success: true, data: drops });
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
};
const editDrop = async (req, res) => {
  const id = req.params.id;
  const newData = req.body;

  try {
    
    const modelInstance = await dropsModel.findByPk(id);

    if (!modelInstance) {
      res.status(200).json({ success: false});
    }

    const updatedInstance = await modelInstance.update(newData);

    res.status(200).json({ success: true, data: updatedInstance });
  } catch (error) {
    res.status(500).send({ message: 'Error updating model', error });
  }
};

const editDropHour = async (req, res) => {
  const data = req.body;
  
  try {
    
    const modelInstance = await dropHoursModel.findOne({
      where: {
        id_drop: data.id_drop,
        id_hours: data.id_hours
      }
    });

    if (!modelInstance) {
      res.status(200).json({ success: false});
    }

    const updatedInstance = await modelInstance.update({drop_quantity: data.drop_quantity});

    res.status(200).json({ success: true, data: updatedInstance });
  } catch (error) {
    res.status(500).send({ message: 'Error updating model', error });
  }
};
const deleteDrop = async (req, res) => {
  const id = req.params.id; // Obtén el ID desde los parámetros de la ruta

  try {
    // Intentar eliminar el registro
    const result = await dropsModel.destroy({
      where: { id_drop: id }
    });

    if (result > 0) {
      res.status(200).json({ success: true})
    } else {
      res.status(404).json({ success: false})
    }
  } catch (error) {
    res.status(500).send({ message: 'Error al eliminar el registro', error });
  }
};

module.exports = {
    insertDrop,
    getDropsByZone,
    createDrop,
    getDrops,
    editDrop,
    deleteDrop,
    getDropsByHour,
    editDropHour
}