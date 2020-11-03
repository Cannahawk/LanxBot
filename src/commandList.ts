import { Command } from './commands/command';
import { Extend } from './commands/extend';
import { Pool } from './commands/pool';
import { Register } from './commands/register';
import { SetCd} from './commands/set-cd';
import { Skip } from './commands/skip';
import { Status } from './commands/status';
import { Turn} from './commands/turn';
import { Unregister } from './commands/unregister';
import { Lanx } from './commands/lanx';
import { Cd } from './commands/cd';
import { Stuck } from './commands/stuck';
import { Unstuck } from './commands/unstuck';
import { Help } from './commands/help';
import { PingMe } from './commands/ping-me';
import { Victory } from './commands/victory';
import { Reset } from './commands/reset';

export interface CommandDefinition {
  [key: string]: {
    commandClass: typeof Command,
    needsRegistration: boolean,
    description: string,
    autoDeleteMessage: boolean
  };
}

export const Commands: CommandDefinition = {
  register: {
    commandClass: Register,
    needsRegistration: false,
    description: 'Register yourself so the bot starts recognizing you',
    autoDeleteMessage: true
  },
  unregister: {
    commandClass: Unregister,
    needsRegistration: true,
    description: 'Remove yourself from the bot so it stops recongnizing you',
    autoDeleteMessage: true
  },
  lanx: {
    commandClass: Lanx,
    needsRegistration: true,
    description: 'Use whenever you cast a Phalanx. Indicates all users as lanxed so they may progress a turn',
    autoDeleteMessage: true
  },
  turn: {
    commandClass: Turn,
    needsRegistration: true,
    description: 'Use whenever you progress a turn',
    autoDeleteMessage: true
  },
  skip: {
    commandClass: Skip,
    needsRegistration: true,
    description: 'Tell the bot that it should not wait for you to progress the current turn before requesting Phalanx',
    autoDeleteMessage: true
  },
  stuck:  {
    commandClass: Stuck,
    needsRegistration: true,
    description: 'Tells the bot to stop waiting for you to progress a turn until you are unstuch or take a turn again',
    autoDeleteMessage: true
  },
  unstuck: {
    commandClass: Unstuck,
    needsRegistration: true,
    description: 'Tells the bot to start waiting for you to progress turns again',
    autoDeleteMessage: true
  },
  status: {
    commandClass: Status,
    needsRegistration: true,
    description: 'Shows who still needs to progress a turn before lanxing again',
    autoDeleteMessage: true
  },
  cd: {
    commandClass: Cd,
    needsRegistration: true,
    description: 'shows the current Phalanx CDs for all players',
    autoDeleteMessage: true
  },
  setcd: {
    commandClass: SetCd,
    needsRegistration: true,
    description: 'Use with a number to set your Phalanx CD to the indicated number',
    autoDeleteMessage: true
  },
  extend: {
    commandClass: Extend,
    needsRegistration: true,
    description: 'increases current Phalanx CD by 2 turns(Orbital Blackness)',
    autoDeleteMessage: true
  },
  pool: {
    commandClass: Pool,
    needsRegistration: true,
    description: 'use without an argument to display current summon pool.\n use with a summon name as argument to update the pool',
    autoDeleteMessage: true
  },
  pingme: {
    commandClass: PingMe,
    needsRegistration: true,
    description: 'toggle wether you get pinged whenever its your turn to lanx',
    autoDeleteMessage: true
  },
  reset: {
    commandClass: Reset,
    needsRegistration: true,
    description: 'resets pool and lanx CDs',
    autoDeleteMessage: true
  },
  help: {
    commandClass: Help,
    needsRegistration: false,
    description: 'display this list',
    autoDeleteMessage: true
  },
  // useless joke command
  // victory: {
  //   command: Victory,
  //   needsRegistration: false,
  //   description: 'just for Ari'
  //   autoDeleteMessage: true
  // },
}