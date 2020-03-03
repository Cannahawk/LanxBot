import { Bot } from "./bot";
import Discord from 'discord.js';
import { Command } from './commands/command';
import { Lanx } from './commands/lanx';

export class Parser {
  constructor(bot: Bot, message: Discord.Message) {
    this.ExecuteCommand(bot, message);
  }

  private commands: { [key: string]: typeof Command; } = {
    "lanx": Lanx
  }
  
  ExecuteCommand(bot: Bot, message: Discord.Message):void {
    let firstSpace = message.content.indexOf(' ');
    let commandName: string;
    if(firstSpace > -1) {
      commandName = message.content.substring(0, firstSpace);
    } else {
      commandName = message.content
    }

    let command = this.commands[commandName];
    if(command !== undefined) {
      new this.commands[commandName](bot, message).Execute();
    } else {
      new Command(bot, message).Execute();
    }
  }
}