import { Bot } from '../bot';
import Discord from 'discord.js';
import { Command } from './command';

export class Users extends Command {

  constructor(bot: Bot, message: Discord.Message ) {
    super(bot, message);
  }

  Execute(): void {
    this.Reply('current users: \n' + this.GetUsernames());
  }
}