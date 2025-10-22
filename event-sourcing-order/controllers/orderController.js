import Event from "../models/Event.js";
import { rebuildOrder } from "../utils/rebuildOrder.js";

// Create order
export const createOrder = async (req, res) => {
  try {
    const { userId, productId, quantity, totalPrice } = req.body;
    const orderId = new Date().getTime().toString(); // simple unique id for demo

    const event = await Event.create({
      type: "order_created",
      data: { _id: orderId, userId, productId, quantity, totalPrice },
    });

    res.status(201).json({ success: true, order: event.data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Cancel order
export const cancelOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await Event.create({
      type: "order_cancelled",
      data: { _id: id },
    });

    res.status(200).json({ success: true, message: "Order cancelled" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get order by ID (rebuild state)
export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const events = await Event.find({ "data._id": id }).sort({ createdAt: 1 });
    if (!events || events.length === 0)
      return res.status(404).json({ success: false, message: "Order not found" });

    const order = rebuildOrder(events);
    res.status(200).json({ success: true, order });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
