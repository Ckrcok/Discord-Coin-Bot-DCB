module.exports = {
  name: "server",
  description: "server info",
  execute(message, arg) {
    `This server's name is: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`;
  }
};
