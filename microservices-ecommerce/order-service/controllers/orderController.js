import axios from "axios";
import Order from "../models/Order.js";
import { getChannel } from "../utils/rabbitmq.js";

const USER_SERVICE_URL = "http://localhost:3001";
const PRODUCT_SERVICE_URL = "http://localhost:3002";

export const createOrder = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    // Fetch product data
    const productRes = await axios.get(`${PRODUCT_SERVICE_URL}/${productId}`);
    const product = productRes.data.product;

    if (!product) return res.status(404).json({ success: false, message: "Product not found" });

    if (product.stock < quantity)
      return res.status(400).json({ success: false, message: "Insufficient stock" });

    // (Optional) Check user existence
    const userRes = await axios.get(`${USER_SERVICE_URL}/${userId}`).catch(() => null);
    if (!userRes || !userRes.data.success)
      return res.status(404).json({ success: false, message: "User not found" });

    const totalPrice = product.price * quantity;

    const order = await Order.create({
      userId,
      productId,
      quantity,
      totalPrice,
    });

    // Publish event to RabbitMQ
    const channel = getChannel();
    const event = { type: "order_created", data: order };
    channel.publish("order_exchange", "", Buffer.from(JSON.stringify(event)));
    console.log("📨 Order event published:", event);

    res.status(201).json({ success: true, order });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const cancelOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findById(orderId);
    if (!order)
      return res.status(404).json({ success: false, message: "Order not found" });

    order.status = "cancelled";
    await order.save();

    // Publish 'order_cancelled' event
    const channel = getChannel();
    const event = { type: "order_cancelled", data: order };
    channel.publish("order_exchange", "", Buffer.from(JSON.stringify(event)));
    console.log("📨 Order cancelled event published:", event);

    res.status(200).json({ success: true, order });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getAllOrders = async (req, res) => {
  const orders = await Order.find();
  res.status(200).json({ success: true, orders });
};

export const getOrderById = async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).json({ success: false, message: "Order not found" });
  res.status(200).json({ success: true, order });
};
