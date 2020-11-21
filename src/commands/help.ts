import { Command } from './command';
import { Commands } from '../commandList';
import { Bot } from '../bot';
import Discord from 'discord.js';

export class Help extends Command {
  constructor(bot: Bot, message: Discord.Message) {
    super(bot, message);
  }

  Execute(): void {
    let commandList = '';

    Object.entries(Commands).forEach(([commandName, command]) => {
      commandList += '**' + this.bot.config.prefix + commandName + '**: ' + command.description + '\n';
    });

    this.Reply(commandList);
  }
}