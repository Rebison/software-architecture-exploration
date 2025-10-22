import { getChannel } from "../utils/rabbitmq.js";
import Product from "../models/Product.js";

export async function consumeOrderEvents() {
    const channel = getChannel();
    const queue = "product_order_queue";

    await channel.assertQueue(queue, { durable: false });
    await channel.bindQueue(queue, "order_exchange", "");

    channel.consume(queue, async (msg) => {
        const event = JSON.parse(msg.content.toString());

        if (event.type === "order_created") {
            const { productId, quantity } = event.data;
            const product = await Product.findById(productId);
            if (product) {
                product.stock -= quantity;
                await product.save();
                console.log(`🧾 Product stock updated for order ${event.data._id}`);
            }
        }

        if (event.type === "order_cancelled") {
            const { productId, quantity } = event.data;
            const product = await Product.findById(productId);
            if (product) {
                product.stock += quantity; // restore stock
                await product.save();
                console.log(`🔄 Product stock restored for cancelled order ${event.data._id}`);
            }
        }

        channel.ack(msg);
    });

    console.log("📡 Product-service listening for order events...");
}

