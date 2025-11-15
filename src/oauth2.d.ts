declare class OAuth2 {
  getAccessToken(code: string, redirectUri: string, clientId: string, clientSecret: string): Promise<any>;
  getProfile(accessToken: string): Promise<any>;
}

export default OAuth2;
