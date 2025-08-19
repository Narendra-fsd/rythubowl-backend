const Razorpay = require("razorpay");
const OrderModel = require("../models/orderModel");
const Payment = require("../models/paymentModel");

const razorpay = new Razorpay({
  key_id: "rzp_test_h5bgZzCw9TQtTr",
  key_secret: "4APx9NMZALi4r0b3fMv9AAoB",
});

//
const createpayment = async (req, res) => {
  try {
    const { amount, currency = "INR", receipt, orderDetails } = req.body;

    const options = {
      amount: amount * 100, // amount in paise (1 INR = 100 paise)
      currency,
      receipt: receipt || `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    const newOrder = new OrderModel({
      amount,
      currency,
      paymentOrderId: order.id,
      userId: orderDetails.userId,
      customerDetails: orderDetails.customerDetails,
      status: "Placed",
      paymentStatus: "initiated",
      OrderItems: orderDetails.OrderItems,
    });
    await newOrder.save();

    res.json({
      success: true,
      order,
      message: "Order created successfully",
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create order",
    });
  }
};

const verifyPayment = async (req, res) => {
  try {
    const { order_id, payment_id, signature } = req.body;
    const orderDetails = await OrderModel.findOne({ paymentOrderId: order_id });
    console.log("Order found:", orderDetails);

    const newPayment = new Payment({
      amount: orderDetails.amount,
      currency: orderDetails.currency,
      orderId: orderDetails._id,
      razorpay_order_id: order_id,
      razorpay_payment_id: payment_id,
      razorpay_signature: signature,
      status: "completed",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    await newPayment.save();
    // Create expected signature
    const crypto = require("crypto");
    const expectedSignature = crypto
      .createHmac("sha256", "4APx9NMZALi4r0b3fMv9AAoB")
      .update(order_id + "|" + payment_id)
      .digest("hex");

    if (expectedSignature === signature) {
      // Update order status in database
      const order = await OrderModel.findOne({ paymentOrderId: order_id });
      if (order) {
        order.paymentStatus = "completed";
        order.updatedAt = new Date();
        await order.save();
      }

      res.json({
        success: true,
        message: "Payment verified successfully",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Invalid signature",
      });
    }
  } catch (error) {
    console.error("Error verifying payment:", error);
    res.status(500).json({
      success: false,
      message: "Failed to verify payment",
    });
  }
};

const getKey = (req, res) => {
  res.json({
    key: "rzp_test_h5bgZzCw9TQtTr",
  });
};

module.exports = {
  createpayment,
  verifyPayment,
  getKey,
};
