import amqplib from "amqplib";

let channel = null;

export async function connectRabbitMQ() {
  try {
    const connection = await amqplib.connect("amqp://localhost");
    channel = await connection.createChannel();
    console.log("✅ Connected to RabbitMQ");
  } catch (err) {
    console.error("❌ RabbitMQ connection failed:", err);
  }
}

export function getChannel() {
  if (!channel) throw new Error("RabbitMQ channel not initialized");
  return channel;
}
