import { User } from './user';
import Discord from 'discord.js'
import { Command } from './commands/command';
import { Commands } from './commandList';

export class Bot {
  users: User[];
  pool: string;

  constructor() {
    this.users = [];
    this.pool = '';
  }

  ExecuteCommand(message: Discord.Message): void {
    const commandName = this.GetCommandName(message);
    const command = Commands[commandName];

    if(command !== undefined &&
    (this.IsRegistered(message) || !command.needsRegistration)) {
      const commandClass = new command.commandClass(this, message)
      commandClass.Execute();
      if(command.autoDeleteMessage) {
        commandClass.DeleteCallingMessage();
      }
    } else if(this.IsRegistered(message) && command === undefined) {
      new Command(this, message).Execute();
    }
  }

  GetCommandName(message: Discord.Message): string {
    const firstSpace = message.content.indexOf(' ');
    if(firstSpace > -1) {
      return message.content.substring(0, firstSpace);
    } else {
      return message.content
    }
  }

  IsRegistered(message: Discord.Message): boolean {
    return this.users.some((user) => user.id === message.author.id);
  }
}