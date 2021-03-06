import { Bot } from '../bot';
import Discord from 'discord.js';
import { Command } from './command';

export class Skip extends Command {

  constructor(bot: Bot, message: Discord.Message ) {
    super(bot, message);
  }

  Execute(): void {
    this.GetUser().SkipTurn();
    this.Reply(this.GetUser().name + ' is skipping');
    this.CheckForLanx();
  }
}