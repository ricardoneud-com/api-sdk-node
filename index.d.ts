import Games from './src/games';
import Tools from './src/tools';
import Reseller from './src/reseller';
import User from './src/user';
import OAuth2 from './src/oauth2';

export interface APIConfig {
  apiKey?: string;
  secret?: string;
  baseURL?: string;
  version?: 'v1' | 'v2' | 'v3' | 'v4';
  timeout?: number;
}

declare class RicardoNeudAPI {
  constructor(config?: APIConfig);
  games: Games;
  tools: Tools;
  reseller: Reseller;
  user: User;
  oauth2: OAuth2;
  setVersion(version: string): this;
  setApiKey(apiKey: string): this;
  setSecret(secret: string): this;
}

export default RicardoNeudAPI;
