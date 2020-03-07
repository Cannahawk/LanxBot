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

export interface CommandDefinition {
  [key: string]: {
    command: typeof Command,
    needsRegistration: boolean,
    description: string
  };
}

export const Commands: CommandDefinition = {
  lanx: {
    command: Lanx,
    needsRegistration: true,
    description: 'Use whenever you cast a Phalanx. Indicates all users as lanxed so they may progress a turn'
  },
  extend: {
    command: Extend,
    needsRegistration: true,
    description: 'increases current Phalanx CD by 2 turns'
  },
  pool: {
    command: Pool,
    needsRegistration: true,
    description: 'use without an argument to display current summon pool.\n use with a summon name as argument to update the pool'
  },
  register: {
    command: Register,
    needsRegistration: false,
    description: 'Register yourself so the bot starts recognizing you'
  },
  setcd: {
    command: SetCd,
    needsRegistration: true,
    description: 'Use with a number to set your Phalanx CD to the indicated number'
  },
  skip: {
    command: Skip,
    needsRegistration: true,
    description: 'Tell the bot that it should not wait for you to progress the current turn before requesting Phalanx'
  },
  status: {
    command: Status,
    needsRegistration: true,
    description: 'Shows who still needs to progress a turn before lanxing again'
  },
  turn: {
    command: Turn,
    needsRegistration: true,
    description: 'Use whenever you progress a turn'
  },
  unregister: {
    command: Unregister,
    needsRegistration: true,
    description: 'Remove yourself from the bot so it stops recongnizing you'
  },
  cd: {
    command: Cd,
    needsRegistration: true,
    description: 'shows the current Phalanx CDs for all players'
  },
  stuck:  {
    command: Stuck,
    needsRegistration: true,
    description: 'Tells the bot to stop waiting for you to progress a turn until you are unstuch or take a turn again'
  },
  unstuck: {
    command: Unstuck,
    needsRegistration: true,
    description: 'Tells the bot to start waiting for you to progress turns again'
  },
  help: {
    command: Help,
    needsRegistration: false,
    description: 'display this list'
  }
}