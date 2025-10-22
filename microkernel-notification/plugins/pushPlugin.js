export default {
  init(core) {
    core.on("user_registered", async (user) => {
      await new Promise(r => setTimeout(r, 200));
      console.log(`🔔 Push notification sent to ${user.deviceId}`);
    });
  },
};
