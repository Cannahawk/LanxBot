import { Bot } from "./bot";
import Discord from 'discord.js';
import { Command } from './commands/command';
import { Extend } from './commands/extend';
import { Pool } from './commands/pool';
import { Register } from './commands/register';
import { SetCd} from './commands/set-cd';
import { Skip } from './commands/skip';
import { Status } from './commands/status';
import { Turn} from './commands/turn';
import { Unregister } from './commands/unregister';
import { Lanx } from './commands/lanx';
import { Cd } from './commands/cd';
import { Stuck } from "./commands/stuck";
import { Unstuck } from "./commands/unstuck";

export class Parser {
  constructor(bot: Bot, message: Discord.Message) {
    this.bot = bot;
    this.message = message;
    this.ExecuteCommand();
  }

  private bot: Bot;
  private message: Discord.Message

  private commands: { [key: string]: { command: typeof Command, 
    needsRegistration: boolean,
    description: string }; } = {
    'lanx': {
      command: Lanx,
      needsRegistration: true,
      description: ''
    },
    'extend': {
      command: Extend,
      needsRegistration: true,
      description: ''
    },
    'pool': {
      command: Pool,
      needsRegistration: true,
      description: ''
    },
    'register': {
      command: Register,
      needsRegistration: false,
      description: ''
    },
    'setcd': {
      command: SetCd,
      needsRegistration: true,
      description: ''
    },
    'skip': {
      command: Skip,
      needsRegistration: true,
      description: ''
    },
    'status': {
      command: Status,
      needsRegistration: true,
      description: ''
    },
    'turn': {
      command: Turn,
      needsRegistration: true,
      description: ''
    },
    'unregister': {
      command: Unregister,
      needsRegistration: true,
      description: ''
    },
    'cd': {
      command: Cd,
      needsRegistration: true,
      description: ''
    },
    'stuck':  {
      command: Stuck,
      needsRegistration: true,
      description: ''
    },
    'unstuck': {
      command: Unstuck,
      needsRegistration: true,
      description: ''
    }
  }
  
  ExecuteCommand():void {

    let commandName = this.GetCommandName();
    let command = this.commands[commandName];

    if(command !== undefined &&
      (this.isRegistered() || !command.needsRegistration)) {
      new command.command(this.bot, this.message).Execute();
    } else if(this.isRegistered() && command === undefined) {
      new Command(this.bot, this.message).Execute();
    }
  }

  GetCommandName(): string {
    let firstSpace = this.message.content.indexOf(' ');
    if(firstSpace > -1) {
      return this.message.content.substring(0, firstSpace);
    } else {
      return this.message.content
    }
  }

  isRegistered(): boolean {
    return this.bot.users.some((user) => user.id === this.message.author.id);
  }
}