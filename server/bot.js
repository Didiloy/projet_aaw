const Discord = require("discord.js");

const bot = new Discord.Client();

const prefix = "!";

bot.on("message", function(message) { 
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();

    if (command === "ping") {
        message.reply(`Pong!`);       
    }   
    message.reply(command);

});                                      

bot.login(DISCORD_CLIENT_ID);

module.exports(bot);