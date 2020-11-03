import { Bot } from '../bot';
import Discord from 'discord.js';
import { User } from '../user';
import { Command } from './command';

export class PingMe extends Command {

  constructor(bot: Bot, message: Discord.Message ) {
    super(bot, message);
  }

  Execute(): void {
      const user = this.GetUser();
      user.togglePingState();
      if(user.getsPinged()) {
          this.Reply('pings on')
      } else {
        this.Reply('pings off')
      }
  }

}
