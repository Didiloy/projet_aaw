const Discord = require("discord.js");
require("dotenv").config();
const { getQuotesByAuthor, getAllQuotes } = require("./bot_helper.js");

const bot = new Discord.Client({ intents: 33280 });

const prefix = "!";

bot.on("ready", async (c) => {
  console.log(bot.user.username + " is ready");
  c.user.setActivity("faire le gros bébé qui veut pas fonctionner");
  c.channels.fetch("1172553667338047599").then((channel) => {
    // channel.send("Je suis pret");
  });
  //TODO: trouver un moyen d'avoir le channel par nom
});

bot.on("messageCreate", function (message) {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  const commandBody = message.content.slice(prefix.length);
  //   console.log("commandeBody: " + commandBody);
  const args = commandBody.split(" ");
  const command = args.shift().toLowerCase();
  //   console.log(command);

  switch (command) {
    case "ping": {
      message.reply("Pong !");
      break;
    }
    case "quotes": {
      if (args.length == 0) {
        getAllQuotes().then((quotes) => {
          if (quotes == "") {
            return;
          }
          message.reply(quotes);
        });
      } else if (args.length == 1) {
        getQuotesByAuthor(args[0]).then((quotes) => {
          if (quotes == "") {
            message.reply("Aucune citation de cet auteur");
            return;
          }
          message.reply(quotes);
        });
      } else {
        message.reply("Commande incorrecte.\nUsage: !quotes <auteur>");
      }
      break;
    }
  }
});

bot.login(process.env.DISCORD_BOT_TOKEN);
module.exports = bot;
