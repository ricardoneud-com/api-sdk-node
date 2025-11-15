const axios = require('axios');
const Games = require('./src/games');
const Tools = require('./src/tools');
const Reseller = require('./src/reseller');
const User = require('./src/user');
const OAuth2 = require('./src/oauth2');

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

module.exports = RicardoNeudAPI;
