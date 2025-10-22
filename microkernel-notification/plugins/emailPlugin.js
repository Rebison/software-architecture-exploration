export default {
  init(core) {
    core.on("user_registered", async (user) => {
      await new Promise(r => setTimeout(r, 500)); // simulate delay
      console.log(`📧 Email sent to ${user.email}`);
    });
  },
};
