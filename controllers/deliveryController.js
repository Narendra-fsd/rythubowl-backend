const Delivery = require('../models/deliveryModel');

exports.createDelivery = async (req, res) => {
  try {
    const delivery = new Delivery(req.body);
    await delivery.save();
    res.status(201).json(delivery);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create delivery', error: err.message });
  }
};

exports.getAllDeliveries = async (req, res) => {
  try {
    const deliveries = await Delivery.find().populate('deliveryAgent', 'name phone').populate('order');
    res.json(deliveries);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch deliveries', error: err.message });
  }
};

exports.getDeliveryById = async (req, res) => {
  try {
    const delivery = await Delivery.findById(req.params.id).populate('deliveryAgent').populate('order');
    if (!delivery) return res.status(404).json({ message: 'Delivery not found' });
    res.json(delivery);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get delivery', error: err.message });
  }
};

exports.updateDelivery = async (req, res) => {
  try {
    const updated = await Delivery.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Delivery not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update delivery', error: err.message });
  }
};

exports.deleteDelivery = async (req, res) => {
  try {
    const deleted = await Delivery.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Delivery not found' });
    res.json({ message: 'Delivery deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete delivery', error: err.message });
  }
};
