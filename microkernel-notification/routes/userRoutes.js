import express from "express";
import core from "../core/core.js";

const router = express.Router();

router.post("/register", (req, res) => {
  const { email, phone, deviceId } = req.body;
  if (!email || !phone || !deviceId)
    return res.status(400).json({ success: false, message: "All fields required" });

  const newUser = { email, phone, deviceId };

  // Trigger event for all plugins
  core.triggerEvent("user_registered", newUser);

  res.status(201).json({ success: true, message: "User registered", user: newUser });
});

export default router;
