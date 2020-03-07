import { Command } from './command';
import { Bot } from '../bot';
import Discord from 'discord.js';

export class Cd extends Command {
  constructor(bot: Bot, message: Discord.Message) {
    super(bot, message);
  }

  Execute(): void {
    let lanxlist = '';
    this.bot.users.forEach(user =>
      lanxlist += user.name + ': ' + (user.lanxCd ? user.lanxCd + 'T' : 'ready') + '\n'
    );

    this.Reply('Lanx CDs:\n' + lanxlist);
  }
}