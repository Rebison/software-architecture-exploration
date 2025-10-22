import express from "express";
import { cancelOrder, createOrder, getAllOrders, getOrderById } from "../controllers/orderController.js";

const router = express.Router();

router.route("/").post(createOrder).get(getAllOrders);
router.route("/:id").get(getOrderById);
router.route("/:id/cancel").put(cancelOrder);

export default router;
