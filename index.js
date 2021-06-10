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
  if (message.content === `${prefix}ping`) {
    message.channel.send("pong");
  } else if (message.content === `${prefix}beep`) {
    message.channel.send("Boop");
  }
});

// login to Discord with your app's token
client.login(token);
