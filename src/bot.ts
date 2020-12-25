import { User } from './user';
import Discord from 'discord.js';
import { Command } from './commands/command';
import { Commands } from './commandList';
import { BotConfig } from './botConfig';
export class Bot {
  users: User[];
  pool: string;
  config: BotConfig;

  constructor() {
    this.users = [];
    this.pool = '';
    this.config = new BotConfig(process.argv.includes('--dev')
      ? require('../botConfig.dev.json')
      : require('../botConfig.json'));
  }

  Start():void {
    const client = new Discord.Client();

    client.login(this.config.token);

    client.on('ready', () => {
      client.user.setActivity(this.config.statusMessage, this.config.status);
      console.log('online');
    });

    client.on('message', (message) => {
      this.ParseMessage(message);
    });
  }

  ParseMessage(message: Discord.Message): void {
    if(message.author.bot) {
      return;
    }
    let usedPrefix: string = null;

    for(const prefix of this.config.prefix) {
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
      this.ExecuteCommand(message);
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
  }

  private ExecuteCommand(message: Discord.Message): void {
    const commandName = this.GetCommandName(message);
    const commandDefinition = Commands[commandName];

    if(commandDefinition !== undefined &&
    (this.IsRegistered(message) || !commandDefinition.needsRegistration)) {
      const commandClass = new commandDefinition.command(this, message);
      commandClass.Execute();
      if(commandDefinition.autoDeleteMessage) {
        commandClass.DeleteCallingMessage();
      }
    } else if(this.IsRegistered(message) && commandDefinition === undefined) {
      new Command(this, message).Execute();
    }
  }

  private GetCommandName(message: Discord.Message): string {
    const firstSpace = message.content.indexOf(' ');
    if(firstSpace > -1) {
      return message.content.substring(0, firstSpace);
    } else {
      return message.content;
    }
  }

  private IsRegistered(message: Discord.Message): boolean {
    return this.users.some((user) => user.id === message.author.id);
  }
}