import { Bot } from '../bot';
import Discord from 'discord.js';
import { User } from '../user';
import { Command } from './command';

export class Unregister extends Command {

  constructor(bot: Bot, message: Discord.Message ) {
    super(bot, message);
  }

  Execute(): void {
    this.bot.users = this.bot.users.filter((user) => user.name !== this.message.author.username);
    this.Reply('current users:\n' + this.GetUsernames());
  }
}