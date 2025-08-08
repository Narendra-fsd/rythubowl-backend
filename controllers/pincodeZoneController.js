const PincodeZone = require('../models/pincodeZoneModel');

// Create a zone
exports.createZone = async (req, res) => {
  try {
    const zone = await PincodeZone.create(req.body);
    res.status(201).json({ message: 'Zone created', zone });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create zone', error: err.message });
  }
};

// Get all zones
exports.getAllZones = async (req, res) => {
  try {
    const zones = await PincodeZone.find();
    res.status(200).json(zones);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch zones', error: err.message });
  }
};

// Get zone by pincode
exports.getZoneByPincode = async (req, res) => {
  try {
    const zone = await PincodeZone.findOne({ pincode: req.params.pincode });
    if (!zone) return res.status(404).json({ message: 'Zone not found' });
    res.status(200).json(zone);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch zone', error: err.message });
  }
};

// Update a zone
exports.updateZone = async (req, res) => {
  try {
    const updated = await PincodeZone.findOneAndUpdate(
      { pincode: req.params.pincode },
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Zone not found' });
    res.status(200).json({ message: 'Zone updated', zone: updated });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update zone', error: err.message });
  }
};

// Delete a zone
exports.deleteZone = async (req, res) => {
  try {
    const deleted = await PincodeZone.findOneAndDelete({ pincode: req.params.pincode });
    if (!deleted) return res.status(404).json({ message: 'Zone not found' });
    res.status(200).json({ message: 'Zone deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete zone', error: err.message });
  }
};
