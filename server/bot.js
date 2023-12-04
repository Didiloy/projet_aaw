const Discord = require("discord.js");
require("dotenv").config();
const {
  getQuotesByAuthor,
  getAllQuotes,
  getFavoritesQuotes,
  createNewQuote,
} = require("./bot_helper.js");

const bot = new Discord.Client({ intents: 33280 });

const prefix = "!mpb ";

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
            message.reply("Aucunes citations disponibles");
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
    case "favorites": {
      const username = message.author.username;
      getFavoritesQuotes(username).then((quotes) => {
        if (quotes == "") {
          message.reply("Aucune citation favorite");
          return;
        }
        message.reply(quotes);
      });
      break;
    }
    case "addquote": {
      if(args.length >= 1){
        const username = message.author.username;
        const q = args[0];
        createNewQuote(q, username)
        message.reply("Ajout réussi !")
      }
      break;
    }
  }
});

bot.login(process.env.DISCORD_BOT_TOKEN);
module.exports = bot;
