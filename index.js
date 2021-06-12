const Discord = require("discord.js");
const { token, MongoDB } = require("./config.json");
const mongoose = require("mongoose");
const { loadCommands } = require("./utils/loadCommands");
const mongoCurrency = require("discord-mongo-currency");

const bot = new Discord.Client({
  partials: ["MESSAGE", "CHANNEL", "REACTION"]
});

mongoose.connect(MongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.set("useFindAndModify", false);

mongoCurrency.connect(MongoDB);

require("./utils/loadEvents")(bot);

bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();
bot.snipes = new Map();

if (bot.MessageReaction === "😀") {
  console.log("reaction added");
}

loadCommands(bot);
bot.login(token);
