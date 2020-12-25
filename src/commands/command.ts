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
    this.bot = bot;

    this.ParseMessage();
  }

  Execute(): void {
    this.Reply('unrecognized Command');
  }

  DeleteCallingMessage(): void {
    this.message.delete();
  }

  private ParseMessage(): void {
    const firstSpace = this.message.content.indexOf(' ');
    if(firstSpace > -1) {
      this.command = this.message.content.substring(0, firstSpace);
      this.argument = this.message.content.substring(firstSpace + 1);
      this.argumentNumber = +this.argument;
    } else {
      this.command = this.message.content;
    }
  }

  protected GetUser(): User {
    return this.bot.users.find((user) => user.id === this.message.author.id);
  }

  protected Reply(message: string): void {
    this.message.channel.send(message);
  }

  protected GetUsernames(): string {
    let userlist = '';

    this.bot.users.forEach(user => {
      userlist += user.name + '\n';
    });

    return userlist;
  }

  protected CheckForLanx(): void  {
    let usersNotYetReady = '';
    this.bot.users.forEach(user => {
      usersNotYetReady += user.IsWaitingForLanx() ? '' : user.name + ' ';
    });
    if(usersNotYetReady === '') {
      this.Reply('all users ready for lanx\n' +
        this.GetNextLanxUser());
    } else {
      this.Reply('waiting for: ' + usersNotYetReady);
    }
    let stuckUsers = '';
    this.bot.users.forEach(user => {
      stuckUsers += user.isSkipping ? user.name + ' ' : '';
    });
    if(stuckUsers) {
      this.Reply('stuck: ' + stuckUsers);
    }
  }

  protected GetNextLanxUser(): string {
    const nextUser = this.bot.users.find(user => user.lanxCd === 0);
    if(nextUser !== undefined) {
      return 'Next Lanx from: ' + (nextUser.getsPinged() ?
        ('<@' + nextUser.id + '>') : nextUser.name);
    } else {
      return 'all lanxes on cd.';
    }
  }
}