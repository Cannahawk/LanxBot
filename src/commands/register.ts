import { Bot } from '../bot';
import Discord from 'discord.js';
import { User } from '../user';
import { Command } from './command';
import * as BotConfig from '../../BotConfig.json';

export class Register extends Command {

  constructor(bot: Bot, message: Discord.Message ) {
    super(bot, message);
  }

  Execute(): void {
    if(this.bot.users.length < BotConfig.maxUsers) {
      if(this.bot.users.find(user => user.name === this.message.author.username)) {
        this.Reply('user already added.');
      } else {
        this.bot.users.push(new User(this.message));
        this.Reply('current users: \n' + this.GetUsernames());
      }
    } else {
      this.Reply('failed to add user '
        + this.message.author.username
        + '. Max number of members already reached');
    }
  }
}