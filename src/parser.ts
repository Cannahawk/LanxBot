import { Bot } from './bot';
import Discord from 'discord.js';
import { Command } from './commands/command';
import { Commands } from './commandList';

export class Parser {
  constructor(bot: Bot, message: Discord.Message) {
    this.bot = bot;
    this.message = message;
    this.ExecuteCommand();
  }

  private bot: Bot;
  private message: Discord.Message

  ExecuteCommand():void {

    const commandName = this.GetCommandName();
    const command = Commands[commandName];

    if(command !== undefined &&
      (this.isRegistered() || !command.needsRegistration)) {
      new command.command(this.bot, this.message).Execute();
    } else if(this.isRegistered() && command === undefined) {
      new Command(this.bot, this.message).Execute();
    }
  }

  GetCommandName(): string {
    const firstSpace = this.message.content.indexOf(' ');
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