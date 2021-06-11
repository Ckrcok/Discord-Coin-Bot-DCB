const Discord = require("discord.js");
const { token } = require("./config.json");
const fs = require("fs");

const client = new Discord.Client();

client.once("ready", () => {
  console.log("Ready!");
});

client.on("message", message => {
  if (message.content === "!react") {
    console.log(`reacting`);
    message.react("👛");
  } else if (message.content === "!coin") {
    console.log(`reacting with a coin`);
    message.react("852684562562547722");
    message.react(":coin:");
  }
});

client.login(token);
