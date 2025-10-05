declare module '@ricardoneud.com/api' {
  export interface APIConfig {
    apiKey?: string;
    secret?: string;
    baseURL?: string;
    version?: 'v1' | 'v2' | 'v3' | 'v4';
    timeout?: number;
  }

  export default class RicardoNeudAPI {
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

  export class Games {
    minecraft(address: string, port?: string): Promise<any>;
    fivem(address: string, port?: string): Promise<any>;
  }

  export class Tools {
    dnsCheck(domain: string, recordType: string): Promise<any>;
    domainCheck(domain: string): Promise<any>;
    mailCheck(domain: string, dkimSelector?: string): Promise<any>;
    mailHostCheck(domain: string, dkimSelector?: string): Promise<any>;
    subdomainFinder(domain: string): Promise<any>;
    geoIP(ip: string): Promise<any>;
  }

  export class Reseller {
    checkLicense(licenseKey: string): Promise<any>;
    generateLicense(data: {
      registeredTo: string;
      domainOrIp: string;
      status: string;
      productId: string;
      projectId: string;
    }): Promise<any>;
    updateLicense(licenseKey: string, data: any): Promise<any>;
    deleteLicense(licenseKey: string): Promise<any>;
  }

  export class User {
    login(emailOrUsername: string, password: string, sendEmail?: boolean): Promise<any>;
    revokeSecret(emailOrUsername: string, password: string, secret: string): Promise<any>;
  }

  export class OAuth2 {
    getAccessToken(code: string, redirectUri: string, clientId: string, clientSecret: string): Promise<any>;
    getProfile(accessToken: string): Promise<any>;
  }
}
