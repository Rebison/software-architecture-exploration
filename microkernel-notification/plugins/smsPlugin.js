export default {
  init(core) {
    core.on("user_registered", async (user) => {
      await new Promise(r => setTimeout(r, 300));
      console.log(`📱 SMS sent to ${user.phone}`);
    });
  },
};
