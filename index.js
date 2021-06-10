// require fs
const fs = require("fs");

// require the discord.js module
const Discord = require("discord.js");

//require config file
const { prefix, token } = require("./config.json");

//require .env file
const dotenv = require("dotenv");
dotenv.config();

// create a new Discord client
const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs
  .readdirSync("./commands")
  .filter(file => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

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
    .split(/ +/);
  const command = args.shift().toLowerCase();
  if (!client.commands.has(command)) return;

  try {
    client.commands.get(command).execute(message, args);
  } catch (error) {
    console.log(error);
    message.reply(
      `there was an erorr trying to execute that command! here is the error ${error}`
    );
  }
});

// login to Discord with your app's token
client.login(token);
