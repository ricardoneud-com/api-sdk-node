const axios = require('axios');

class RicardoNeudAPI {
  constructor(config = {}) {
    this.apiKey = config.apiKey || null;
    this.secret = config.secret || null;
    this.baseURL = config.baseURL || 'https://api.ricardoneud.com';
    this.version = config.version || 'v4';

    this.client = axios.create({
      baseURL: `${this.baseURL}/${this.version}`,
      timeout: config.timeout || 30000,
      headers: this._getHeaders()
    });

    this.games = new Games(this);
    this.tools = new Tools(this);
    this.reseller = new Reseller(this);
    this.user = new User(this);
    this.oauth2 = new OAuth2(this);
  }

  _getHeaders() {
    const headers = {};
    if (this.secret) headers['Authorization'] = `Bearer ${this.secret}`;
    else if (this.apiKey) headers['Basic'] = this.apiKey;
    return headers;
  }

  async request(method, endpoint, data = {}, customHeaders = {}) {
    try {
      const config = {
        method,
        url: endpoint,
        headers: { ...this._getHeaders(), ...customHeaders }
      };

      if (method === 'GET') config.params = data;
      else config.data = data;

      const response = await this.client.request(config);
      return response.data;
    } catch (error) {
      throw this._handleError(error);
    }
  }

  _handleError(error) {
    if (error.response) {
      const err = new Error(error.response.data.error || error.response.data.message || 'API Error');
      err.status = error.response.status;
      err.data = error.response.data;
      return err;
    }
    return error;
  }

  setVersion(version) {
    this.version = version;
    this.client.defaults.baseURL = `${this.baseURL}/${version}`;
    return this;
  }

  setApiKey(apiKey) {
    this.apiKey = apiKey;
    this.secret = null;
    this.client.defaults.headers = this._getHeaders();
    return this;
  }

  setSecret(secret) {
    this.secret = secret;
    this.apiKey = null;
    this.client.defaults.headers = this._getHeaders();
    return this;
  }
}

class Games {
  constructor(client) {
    this.client = client;
  }

  async minecraft(address, port = '25565') {
    return this.client.request('GET', '/games/minecraft/lookup', {}, {
      'X-Address': address,
      'X-Port': port
    });
  }

  async fivem(address, port = '30120') {
    return this.client.request('GET', '/games/fivem/lookup', {}, {
      'X-Address': address,
      'X-Port': port
    });
  }
}

class Tools {
  constructor(client) {
    this.client = client;
  }

  async dnsCheck(domain, recordType) {
    return this.client.request('GET', '/tools/dnscheck', {}, {
      'X-Domain': domain,
      'X-Record-Type': recordType
    });
  }

  async domainCheck(domain) {
    return this.client.request('GET', '/tools/domaincheck', {}, {
      'X-Domain': domain
    });
  }

  async mailCheck(domain, dkimSelector = null) {
    const headers = { 'X-Domain': domain };
    if (dkimSelector) headers['X-DKIM-Selector'] = dkimSelector;
    return this.client.request('GET', '/tools/mailcheck', {}, headers);
  }

  async mailHostCheck(domain, dkimSelector = null) {
    const headers = { 'X-Domain': domain };
    if (dkimSelector) headers['X-DKIM-Selector'] = dkimSelector;
    return this.client.request('POST', '/tools/mailhostcheck', {}, headers);
  }

  async subdomainFinder(domain) {
    return this.client.request('GET', '/tools/subdomainfinder', {}, {
      'X-Domain': domain
    });
  }

  async geoIP(ip) {
    return this.client.request('GET', '/tools/geo-ip', {}, {
      'X-IP': ip
    });
  }
}

class Reseller {
  constructor(client) {
    this.client = client;
  }

  async checkLicense(licenseKey) {
    return this.client.request('GET', `/reseller/${licenseKey}/check`);
  }

  async generateLicense(data) {
    return this.client.request('POST', '/reseller/licenses/generate', {}, {
      'X-Registered-To': data.registeredTo,
      'X-Domain-Or-IP': data.domainOrIp,
      'X-Status': data.status,
      'X-Product-Id': data.productId,
      'X-Project-Id': data.projectId
    });
  }

  async updateLicense(licenseKey, data) {
    const headers = {};
    if (data.registeredTo) headers['X-Registered-To'] = data.registeredTo;
    if (data.domainOrIp) headers['X-Domain-Or-IP'] = data.domainOrIp;
    if (data.status) headers['X-Status'] = data.status;
    if (data.productId !== undefined) headers['X-Product-Id'] = data.productId;
    if (data.projectId) headers['X-Project-Id'] = data.projectId;
    return this.client.request('PUT', `/reseller/${licenseKey}/update`, {}, headers);
  }

  async deleteLicense(licenseKey) {
    return this.client.request('DELETE', `/reseller/${licenseKey}/delete`);
  }
}

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

module.exports = RicardoNeudAPI;
