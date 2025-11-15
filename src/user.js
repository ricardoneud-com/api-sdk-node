class User {
  constructor(client) {
    this.client = client;
  }

  async login(emailOrUsername, password, sendEmail = false) {
    return this.client.request('POST', '/user/login', {
      emailOrUsername,
      password,
      sendEmail: sendEmail ? 'true' : 'false'
    }, { 'Content-Type': 'application/json' });
  }

  async revokeSecret(emailOrUsername, password, secret) {
    return this.client.request('DELETE', '/user/login', {
      emailOrUsername,
      password,
      secret
    });
  }
}

module.exports = User;
