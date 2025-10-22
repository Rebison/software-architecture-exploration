export function rebuildOrder(events) {
  let order = null;

  for (const event of events) {
    switch (event.type) {
      case "order_created":
        order = { ...event.data, status: "created" };
        break;
      case "order_cancelled":
        if (order && order._id === event.data._id) {
          order.status = "cancelled";
        }
        break;
    }
  }

  return order;
}
