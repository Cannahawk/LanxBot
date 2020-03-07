import Discord from 'discord.js'
import { Bot } from './bot';
import * as BotConfig from '../BotConfig.json';

const client = new Discord.Client();

client.login(BotConfig.token);
const bot = new Bot();

client.on('ready', () => {
  client.user.setActivity(BotConfig.statusMessage, <any>(BotConfig).status)
  console.log('online');
})

client.on('message', (message) => {
  if(message.author.bot) {
    return;
  }

  if(!message.content.startsWith(BotConfig.prefix)){
    return;
  }

  message.content = message.content.substring(BotConfig.prefix.length)
    .trim()
    .toLowerCase();

  bot.parseMessage(message)
});




