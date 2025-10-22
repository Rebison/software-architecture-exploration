import express from "express";
import { createOrder, cancelOrder, getOrderById } from "../controllers/orderController.js";

const router = express.Router();

router.post("/", createOrder);
router.put("/:id/cancel", cancelOrder);
router.get("/:id", getOrderById);

export default router;
