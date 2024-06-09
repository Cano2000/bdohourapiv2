const {hoursModel, dropHoursModel} = require('../models/index');

const createHour = async (req, res) => {
  try {
    let body = req.body;
    
    const producto = await hoursModel.create(body);
    
    res.send({success: true, data:producto})
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
};

const insertHours = async () => {
  try {
    const hoursData = [
      { id_zone: 1, id_user: 'user1', num_hours: 5},
      { id_zone: 1, id_user: 'user2', num_hours: 6},
      { id_zone: 2, id_user: 'user3', num_hours: 7},
      { id_zone: 2, id_user: 'user4', num_hours: 8},
      { id_zone: 3, id_user: 'user5', num_hours: 5},
      { id_zone: 3, id_user: 'user6', num_hours: 6},
      { id_zone: 4, id_user: 'user7', num_hours: 7},
      { id_zone: 4, id_user: 'user8', num_hours: 8},
      { id_zone: 5, id_user: 'user9', num_hours: 5},
      { id_zone: 5, id_user: 'user10', num_hours: 6}
    ];

    await hoursModel.bulkCreate(hoursData);
    console.log('Valores insertados correctamente');
  } catch (error) {
    console.error('Error al insertar valores:', error);
  }
};

const getHours = async (req, res) => {
  try {
    const zones = await hoursModel.findAll();
    res.status(200).json({ success: true, data: zones });
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
};

const editHour = async (req, res) => {
  const id = req.params.id;
  const newData = req.body;

  try {
    
    const modelInstance = await hoursModel.findByPk(id);

    if (!modelInstance) {
      res.status(200).json({ success: false});
    }

    const updatedInstance = await modelInstance.update(newData);

    res.status(200).json({ success: true, data: updatedInstance });
  } catch (error) {
    res.status(500).send({ message: 'Error updating model', error });
  }
};

const getHoursByZone = async (req, res) => {
  try {
    const zone = await hoursModel.findByPk(req.params.id);
    if (!zone) {
      return res.status(404).json({ success: false, error: 'Zona no encontrado' });
    }
    res.status(200).json({ success: true, data: zone });
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
};

const deleteHour = async (req, res) => {
  const id = req.params.id;
  try {
    // Intentar eliminar el registro
    const result1 = await dropHoursModel.destroy({
      where: { id_hours: id }
    });
    const result2 = await hoursModel.destroy({
      where: { id_hours: id }
    });

    if (result1 > 0 && result2 > 0) {
      res.status(200).json({ success: true})
    } else {
      res.status(404).json({ success: false})
    }
  } catch (error) {
    res.status(500).send({ message: 'Error al eliminar el registro', error });
  }
};

module.exports = {
    createHour,
    getHours,
    getHoursByZone,
    insertHours,
    editHour,
    deleteHour
}