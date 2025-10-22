import mongoose from "mongoose";

const eventSchema = mongoose.Schema(
  {
    type: { type: String, required: true }, // order_created, order_cancelled
    data: { type: Object, required: true }, // contains order info
    createdAt: { type: Date, default: Date.now },
  },
  { collection: "events" }
);

export default mongoose.model("Event", eventSchema);
