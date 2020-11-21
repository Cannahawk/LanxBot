import { Bot } from '../bot';
import Discord from 'discord.js';
import { Command } from './command';

export class Victory extends Command {

  constructor(bot: Bot, message: Discord.Message ) {
    super(bot, message);
  }

  Execute(): void {
    const isAri = this.message.author.id === this.bot.config.ari;
    if(isAri) {
      this.Reply(':sparkles:  :trophy:  :sparkles:');
    }
  }
}