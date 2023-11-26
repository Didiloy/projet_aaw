const Discord = require("discord.js");
require("dotenv").config();
const { readAllQuotes, findQuotesByAuthor } = require("./database/script.js");

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
    }
    case "quotes": {
      if (args.length == 0) {
        getAllQuotes().then((quotes) => {
          if (quotes == "") {
            return;
          }
          message.reply(quotes);
        });
      }
      if (args.length == 1) {
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
    }
  }
});

const getAllQuotes = async () => {
  const all_quotes_in_json = await readAllQuotes();
  let all_quotes_string = "";
  all_quotes_in_json.forEach((quote) => {
    all_quotes_string += "**" + quote.authorId + "**: " + quote.content + "\n";
  });
  return all_quotes_string;
};

const getQuotesByAuthor = async (author) => {
  const all_quotes_in_json = await findQuotesByAuthor(author);
  let all_quotes_string = "";
  all_quotes_in_json.forEach((quote) => {
    all_quotes_string += "**" + quote.authorId + "**: " + quote.content + "\n";
  });
  return all_quotes_string;
};

bot.login(process.env.DISCORD_BOT_TOKEN);
module.exports = bot;
