import { Bot } from '../bot';
import Discord from 'discord.js';
import { Command } from './command';

export class Reset extends Command {

  constructor(bot: Bot, message: Discord.Message ) {
    super(bot, message);
  }

  Execute(): void {
    this.bot.users.forEach(user => {
      user.lanxCd = 0;
      user.isLanxed = false;
      user.isSkipping = false;
    });

    this.bot.pool = '';

    this.Reply('pool emptied, lanx CDs reseted');
  }
}