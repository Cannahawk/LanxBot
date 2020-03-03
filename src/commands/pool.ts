import { Bot } from '../bot';
import Discord from 'discord.js';
import { User } from '../user';
import { Command } from './command';

export class Pool extends Command {
    
  constructor(bot: Bot, message: Discord.Message ) {
    super(bot, message);
  }
 
  Execute(): void {
    let summon = this.argument;

    if(summon && this.bot.pool) {
      this.bot.pool = '';
      this.Reply('pool is empty');
    } else if(summon) {
      this.bot.pool = summon;
      this.Reply(this.bot.pool +' in pool');
    } else {
      this.Reply(this.bot.pool ? this.bot.pool + ' in pool' :
       'pool is empty');
    }
  }
}