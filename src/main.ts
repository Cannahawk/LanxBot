import Discord from 'discord.js'
import { Bot } from './bot';

let client = new Discord.Client;

const settings = require("./BotConfig.json");

client.login(settings.token);
let bot = new Bot();

client.on('ready', () => {
  client.user.setActivity('you die horribly', { type: 'WATCHING'})
  console.log("online");
})

client.on('message', (message) => { 
  if(message.author.bot) { 
    return;
  }

  if(!message.content.startsWith(settings.prefix)){
    return;
  }

  message.content = message.content.substring(settings.prefix.length)
    .trim()
    .toLowerCase();

  bot.parseMessage(message)
});




