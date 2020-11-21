import { Bot } from '../bot';
import Discord from 'discord.js';
import { Command } from './command';

export class Extend extends Command {

  constructor(bot: Bot, message: Discord.Message ) {
    super(bot, message);
  }

  Execute(): void {
    this.GetUser().Extend();
  }
}