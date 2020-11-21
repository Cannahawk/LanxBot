import { Bot } from '../bot';
import Discord from 'discord.js';
import { Command } from './command';

export class SetCd extends Command {

  constructor(bot: Bot, message: Discord.Message ) {
    super(bot, message);
  }

  Execute(): void {
    const cd = +this.argument;
    if(isNaN(cd) || (this.argument === null)) {
      this.Reply('"' + this.argument + '" is not a valid number');
    } else {
      this.GetUser().lanxCd = cd;
      this.Reply('your cd is now ' + cd + 'T');
    }
  }
}