import { Command } from './command';
import { Commands, CommandDefinition } from '../commandList';
import { Bot } from '../bot';
import Discord from 'discord.js';
import * as BotConfig from '../../BotConfig.json';

export class Help extends Command {
  constructor(bot: Bot, message: Discord.Message) {
    super(bot, message);
  }

  Execute(): void {
    let commandList = '';

    Object.entries(Commands).forEach(([commandName, command]) => {
      commandList += '**' + BotConfig.prefix + commandName + '**: ' + command.description + '\n';
    });

    this.Reply(commandList);
  }
}