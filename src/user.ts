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
    this.isSkipping = true;
  }

  IsWaitingForLanx(): boolean {
    if(this.isSkipping) {
      return true;
    }
    
    if(this.isLanxed) {
      return false;
    }

    return true;
    /*
    l s w
    0 0 1
    0 1 1
    1 0 0
    1 1 1
    */
  }

  Extend(): void {
    this.lanxCd += 2;
  }

}