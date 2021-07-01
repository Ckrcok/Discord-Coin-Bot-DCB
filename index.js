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

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

let author = null;
console.log("First author log -->", author);
bot.on("messageReactionAdd", async (reaction, user) => {
  if (reaction.partial) {
    // If the message this reaction belongs to was removed, the fetching might result in an API error which should be handled
    try {
      await reaction.fetch();
    } catch (error) {
      console.error("Something went wrong when fetching the message: ", error);
      // Return as `reaction.message.author` may be undefined/null
      return;
    }
  }

  console.log(
    `${reaction.message.author.username}'s message "${reaction.message.content}" gained a reaction!`
  );
});

loadCommands(bot);
bot.login(token);
