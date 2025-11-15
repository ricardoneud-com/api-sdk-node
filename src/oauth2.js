class OAuth2 {
  constructor(client) {
    this.client = client;
  }

  async getAccessToken(code, redirectUri, clientId, clientSecret) {
    return this.client.request('POST', '/oauth2/token', {
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirectUri,
      client_id: clientId,
      client_secret: clientSecret
    });
  }

  async getProfile(accessToken) {
    return this.client.request('GET', '/oauth2/profile', {}, {
      'AccessToken': accessToken
    });
  }
}

module.exports = OAuth2;
