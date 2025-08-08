const Delivery = require('../models/deliveryModel');

const assignDeliveryAgent = async (orderId, agentId) => {
  const delivery = new Delivery({
    order: orderId,
    deliveryAgent: agentId,
    deliveryStatus: 'Pending',
  });
  await delivery.save();
  return delivery;
};

const getDeliveryStatusByOrderId = async (orderId) => {
  const delivery = await Delivery.findOne({ order: orderId }).populate('deliveryAgent', 'name phone');
  if (!delivery) throw new Error('Delivery not found');
  return delivery;
};

module.exports = {
  assignDeliveryAgent,
  getDeliveryStatusByOrderId,
};
