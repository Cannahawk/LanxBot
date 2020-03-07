import { Bot } from '../bot';
import Discord from 'discord.js';
import { User } from '../user';

export class Command {
  protected message: Discord.Message;
  protected bot: Bot;
  protected command: string;
  protected argument: string;
  protected argumentNumber: number;

  constructor(bot: Bot, message: Discord.Message ) {
    this.message = message;
    this.bot = bot

    this.ParseMessage()
  }

  Execute(): void {
    this.Reply('unrecognized Command');
  }

  private ParseMessage(): void {
    const firstSpace = this.message.content.indexOf(' ');
    if(firstSpace > -1) {
      this.command = this.message.content.substring(0, firstSpace)
      this.argument = this.message.content.substring(firstSpace + 1);
      this.argumentNumber = +this.argument;
    } else {
      this.command = this.message.content;
    }
  }

  GetUser(): User {
    return this.bot.users.find((user) => user.id === this.message.author.id);
  }

  Reply(message: string): void {
    this.message.channel.send(message);
  }

  getUsernames(): string {
    let userlist = '';

    this.bot.users.forEach(user => {
      userlist += user.name + '\n';
    });

    return userlist;
  }

  CheckForLanx(): void  {
    let usersNotYetReady = '';
    this.bot.users.forEach(user => {
      usersNotYetReady += user.IsWaitingForLanx() ? '' : user.name + ' '
    });
    if(usersNotYetReady === '') {
      this.Reply('all users ready for lanx\n' +
        this.GetNextLanxUser());
    } else {
      this.Reply('waiting for: ' + usersNotYetReady);
    }
  }

  GetNextLanxUser(): string {
    const nextUser = this.bot.users.find(user => user.lanxCd === 0);
    if(nextUser !== undefined) {
      return 'Next Lanx from: ' + nextUser.name;
    } else {
      return 'all lanxes on cd.';
    }
  }
}