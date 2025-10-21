import express from "express";
import { createOrder, getAllOrders, getOrderById } from "../controllers/orderController.js";

const router = express.Router();

router.route("/").post(createOrder).get(getAllOrders);
router.route("/:id").get(getOrderById);

export default router;
