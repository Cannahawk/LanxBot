import { Bot } from '../bot';
import Discord from 'discord.js';
import { User } from '../user';
import { Command } from './command';

export class Turn extends Command {
    
  constructor(bot: Bot, message: Discord.Message ) {
    super(bot, message);
  }
 
  Execute(): void {
    if(this.argument && isNaN(this.argumentNumber)) {
      this.Reply('"' + this.argument + '" is not a valid number');
    } else {
      if(!isNaN(this.argumentNumber)) {
        for(let i = 0; i < this.argumentNumber; i++) {
          this.GetUser().TakeTurn();
        }
      } else {
        this.GetUser().TakeTurn();
      }

      this.CheckForLanx();
    }
  }
}