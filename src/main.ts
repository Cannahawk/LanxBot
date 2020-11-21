import Discord from 'discord.js';
import { Bot } from './bot';

const bot = new Bot();
const client = new Discord.Client();

client.login(bot.config.token);

client.on('ready', () => {
  client.user.setActivity(bot.config.statusMessage, bot.config.status);
  console.log('online');
});

client.on('message', (message) => {
  if(message.author.bot) {
    return;
  }
  let usedPrefix: string = null;

  for(const prefix of bot.config.prefix) {
    if(message.content.startsWith(prefix)) {
      usedPrefix = prefix;
      break;
    }
  }

  if(usedPrefix === null){
    return;
  }

  try {
    message.content = message.content.substring(usedPrefix.length)
    .trim()
    .toLowerCase();
    bot.ExecuteCommand(message);
  }
  catch(e) {
    console.log('an error occured');
    console.log('Message:');
    console.log(message.content);
    console.log('Timestamp:');
    console.log(new Date(Date.now()).toLocaleString());
    console.log('Exception:');
    console.log(e);
  }
});
