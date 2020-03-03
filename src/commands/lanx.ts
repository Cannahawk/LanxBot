import { Bot } from '../bot';
import Discord from 'discord.js';
import { User } from '../user';
import { Command } from './command';

export class Lanx extends Command {
    
  constructor(bot: Bot, message: Discord.Message ) {
    super(bot, message);
  }
 
  Execute(): void {
    this.GetUser().Lanx(); 
    this.bot.users.forEach(user => {
      user.getLanxed();
    });
    this.Reply('lanxed');
  }
}