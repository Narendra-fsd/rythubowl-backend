const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const paymentController = require('../controllers/paymentController');
const { rbacMiddleware } = require('../middlewares/rbacMiddleware');
const { createRazorpayOrder, verifyRazorpaySignature } = require('../services/paymentService');


router.use(authMiddleware);


// 📌 Create Razorpay Order
router.post('/razorpay-order', async (req, res) => {
  try {
    const { amount } = req.body;
    const order = await createRazorpayOrder({
      amount,
      receipt: `order_rcptid_${Date.now()}`
    });
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create Razorpay order', error: err.message });
  }
});

// 📌 Verify Razorpay Payment
router.post('/verify-razorpay-payment', async (req, res) => {
  try {
    const {
      orderId,
      paymentId,
      signature,
      amount,
      paymentMode,
      orderRef,
      subscriptionRef,
    } = req.body;

    const isValid = verifyRazorpaySignature(orderId, paymentId, signature);

    if (!isValid) {
      return res.status(400).json({ message: 'Invalid signature. Payment verification failed.' });
    }

    const payment = new Payment({
      user: req.user.userId,
      order: orderRef || null,
      subscription: subscriptionRef || null,
      paymentMode: paymentMode || 'Online',
      paymentGateway: 'Razorpay',
      amount,
      status: 'Success',
      transactionId: paymentId,
    });

    await payment.save();

    res.status(200).json({ message: 'Payment verified and saved', payment });
  } catch (err) {
    res.status(500).json({ message: 'Payment verification failed', error: err.message });
  }
});

// Basic CRUD
router.post('/', paymentController.createPayment);
router.get('/:id', paymentController.getPaymentById);
router.get('/', rbacMiddleware('SuperAdmin'), paymentController.getAllPayments);
router.put('/:id', rbacMiddleware('SuperAdmin'), paymentController.updatePayment);
router.delete('/:id', rbacMiddleware('SuperAdmin'), paymentController.deletePayment);

module.exports = router;
