import Discord from 'discord.js';

export class User {

  constructor(message: Discord.Message) {
    this.name = message.author.username;
    this.id = message.author.id;
    this.lanxCd = 0;
    this.isLanxed = false;
    this.isSkipping = false;
  }

  readonly name: string;
  readonly id: string;
  lanxCd: number;
  isLanxed: boolean;
  isSkipping: boolean;

  Lanx(): void {
    this.lanxCd = 5;
  }

  getLanxed(): void {
    this.isLanxed = true;
  }

  TakeTurn(): void {
    if(this.lanxCd > 0) {
      this.lanxCd -= 1;
    }
    this.isLanxed = false;
    this.isSkipping = false;
  }

  SkipTurn(): void {
    this.isLanxed = false;
  }

  Stuck(): void {
    this.isSkipping = true;
  }

  UnStuck(): void {
    this.isSkipping = false;
  }

  IsWaitingForLanx(): boolean {
    if(this.isSkipping) {
      return true;
    }

    if(this.isLanxed) {
      return false;
    }

    return true;
  }

  Extend(): void {
    this.lanxCd += 2;
  }

}