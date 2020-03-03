import { User } from './user';
import Discord from 'discord.js'
import { Parser } from './parser';

export class Bot {
  users: User[];
  pool: string;

  constructor() {
    this.users = [];
    this.pool = '';
  }

  parseMessage(message: Discord.Message) {
    new Parser(this, message);
  }
}