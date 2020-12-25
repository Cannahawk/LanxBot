export class BotConfig {

  constructor(config: any) {
    this.token = config.token;
    this.prefix = config.prefix;
    this.maxUsers = config.maxUsers;
    this.statusMessage = config.statusMessage;
    this.status = config.status;
    this.ari = config.ari;
  }

  token: string;
  prefix: string[];
  maxUsers: number;
  statusMessage: string;
  status: {
    type: 'WATCHING' | 'PLAYING' | 'LISTENING' | 'STREAMING' | 'CUSTOM_STATUS' | number
  };
  ari: string;
}