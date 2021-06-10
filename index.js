// require the discord.js module
const Discord = require("discord.js");

//require config file
const { prefix, token } = require("./config.json");

//require .env file
const dotenv = require("dotenv");
dotenv.config();

// create a new Discord client
const client = new Discord.Client();

// when the client is ready, run this code
// this event will only trigger one time after logging in
client.once("ready", () => {
  console.log("Ready!");
});

client.on("message", message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(" ");
  const command = args.shift().toLowerCase();

  if (!message.mentions.users.size) {
    return message.reply("you need to tag a user in order to kick them!");
  }

  if (message.content === `${prefix}ping`) {
    message.channel.send("pong");
  } else if (message.content === `${prefix}beep`) {
    message.channel.send("Boop");
  } else if (message.content === `${prefix}server`) {
    message.channel.send(
      `This server's name is: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`
    );
  } else if (command === "kick") {
    // Grab the "first" mentioned user from the message
    // This will return a `User` object, just like `message.author`
    const taggedUser = message.mentions.users.first();

    message.channel.send(`You wanted to kick: ${taggedUser.username}`);
  }
});

// login to Discord with your app's token
client.login(token);
