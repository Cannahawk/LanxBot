import { Bot } from "./bot";
import Discord from 'discord.js';
import { User } from './user';

export class Parser {
  constructor(bot: Bot, message: Discord.Message) {
    this.bot = bot;
    this.message = message;
    this.Parse();
  }

  private message: Discord.Message;
  private bot: Bot;
  private command: string;
  private argument: string;
  private argumentNumber: number;

  Parse(): void {
    this.ReadMessageContents();

    if(this.GetUser() === undefined 
      && this.command != 'register') {
        return;
    }

    switch(this.command) {
      case 'register':
        this.Register();
        break;
      case 'unregister':
        this.UnRegister();
        break;
      case 'lanx':
        this.Lanx();
        break;
      case 'extend':
        this.Extend();
        break;
      case 'turn':
        this.TakeTurn();
        break;
      case 'skip':
        this.SkipTurn();
        break;
      case 'status':
        this.CheckForLanx();
        break;
      case 'cd':
        this.ShowLanx();
        break;
      case 'setcd':
        this.SetCd();
        break;
      case 'pool':
        this.Summon();
        break;
      default:
        this.Reply('unrecognized command');
    }
  }

  ReadMessageContents() {
    let firstSpace = this.message.content.indexOf(' ');
    if(firstSpace > -1) {
      this.command = this.message.content.substring(0, firstSpace)
      this.argument = this.message.content.substring(firstSpace + 1);
      this.argumentNumber = +this.argument;
    } else {
      this.command = this.message.content;
    }
  }

  Register(): void {
    if(this.MaxUsersNotReached()) {
      if(this.bot.users.find(user => user.name === this.message.author.username)) {
        this.Reply('user already added.');
      } else {
        this.bot.users.push(new User(this.message));
        this.Reply('current users: \n' + this.getUsernames());
      }
    } else {
      this.Reply('failed to add user '
        + this.message.author.username
        + '. Max number of members already reached');
    }
  }

  UnRegister(): void {
    this.bot.users = this.bot.users.filter((user) => user.name !== this.message.author.username);
    this.Reply('current users:\n' + this.getUsernames());
  }

  Lanx(): void {
    this.GetUser().Lanx(); 
    this.bot.users.forEach(user => {
      user.getLanxed();
    });
    this.Reply('lanxed');
  }

  Extend(): void {
    this.GetUser().Extend();
  }

  TakeTurn(): void {
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

  SkipTurn(): void {
    this.GetUser().SkipTurn();
    this.CheckForLanx();
  }

  CheckForLanx(): void  {
    let usersNotYetReady = '';
    this.bot.users.forEach(user => usersNotYetReady += user.IsWaitingForLanx() ? '' : user.name + ' ');
    if(usersNotYetReady === '') {
      this.Reply('all users ready for lanx'
        + '\n' + this.GetNextLanxUser());
    } else {
      this.Reply('waiting for:' + usersNotYetReady);
    }
  }

  GetNextLanxUser(): string {
    const user = this.bot.users.find((user) => user.lanxCd === 0);
    if(user !== undefined) {
      return 'Next Lanx from: ' + user.name;
    } else {
      return 'all lanxes on cd.';
    }
  }

  ShowLanx(): void {
    let lanxlist = '';
    this.bot.users.forEach(user => lanxlist += user.name + ': ' + (user.lanxCd ? user.lanxCd + 'T' : 'ready') + '\n');

    this.Reply('Lanx CDs:\n' + lanxlist);
  }

  Summon(): void {
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

  SetCd(): void {
    let cd = +this.argument;
    if(isNaN(cd) || (this.argument === null)) {
      this.Reply('"' + this.argument + '" is not a valid number');
    } else {
      this.GetUser().lanxCd = cd;
      this.Reply('your cd is now ' + cd + 'T');
    }
  }

  MaxUsersNotReached(): boolean {
    return this.bot.users.length < 6;
  }

  getUsernames(): string {
    let userlist = '';
    
    this.bot.users.forEach(user => {
      userlist += user.name + '\n';
    });

    return userlist;
  }

  GetUser(): User {
    return this.bot.users.find((user) => user.id === this.message.author.id);
  }

  Reply(message: string): void {
    this.message.channel.send(message);
  }
}