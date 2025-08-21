import Razorpay from "razorpay";
import crypto from "crypto";

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const createRazorpayOrder = async ({ amount, currency = "INR", receipt }) => {
  const options = {
    amount: amount * 100, // convert to paisa
    currency,
    receipt,
    payment_capture: 1,
  };
  return await razorpayInstance.orders.create(options);
};

export const verifyRazorpaySignature = (order_id, payment_id, razorpay_signature) => {
  const body = `${order_id}|${payment_id}`;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest("hex");

  return expectedSignature === razorpay_signature;
};
