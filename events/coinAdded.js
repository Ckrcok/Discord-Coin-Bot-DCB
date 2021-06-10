module.exports = {
  name: "coinAdded",
  description: "added coin to a user",
  once: true,
  execute(client) {
    console.log(`added a coin to : ${client.user.tag}`);
  }
};
