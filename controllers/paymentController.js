const Payment = require('../models/paymentModel');

exports.createPayment = async (req, res) => {
  try {
    const payment = new Payment({ ...req.body, userId: req.user._id });
    await payment.save();
    res.status(201).json(payment);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create payment', error: err.message });
  }
};

exports.getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find().populate('orderId subscriptionId');
    res.json(payments);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch payments', error: err.message });
  }
};

exports.getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id).populate('user order subscription');
    if (!payment) return res.status(404).json({ message: 'Payment not found' });
    res.json(payment);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get payment', error: err.message });
  }
};

exports.updatePayment = async (req, res) => {
  try {
    const updated = await Payment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Payment not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update payment', error: err.message });
  }
};

exports.deletePayment = async (req, res) => {
  try {
    const deleted = await Payment.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Payment not found' });
    res.json({ message: 'Payment deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete payment', error: err.message });
  }
};
