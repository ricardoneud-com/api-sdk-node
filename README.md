# NPM Module for API Usage

This guide explains how to use the **official NPM module** to interact with the API. It covers **installation, setup, authentication, and using the main modules** such as games, tools, reseller, and user management.

> ⚠️ **Important:** Always verify which endpoints are available in which version. Not all endpoints exist in every version, and some features are only available from v3 and above. Make sure your project uses a supported API version.

## Installation

```bash
npm install @ricardoneud.com/api
```
OR
```bash
yarn add @ricardoneud.com/api
```

## Initialization

The client can be initialized with either an **API Key** or a **Secret token**:

```javascript
const RicardoNeudAPI = require('@ricardoneud.com/api');

const api = new RicardoNeudAPI({
  apiKey: 'your-api-key', // OR use secret: 'your-secret'
  version: 'v4'
});
```

### Changing Version

```javascript
api.setVersion('v4'); // Verify which endpoints are supported in v4
```

## Authentication

### API Key

1. Log in at [Ricardoneud.com](https://auth.ricardoneud.com/login)
2. Go to **Dashboard → API Keys**
3. Click **Create API Key**, configure permissions, and set environment to `Production`.
4. Use the API Key in your client:

```javascript
api.setApiKey('your-api-key');
```

### Secret Token (Login-based)

Short-lived tokens provide session-based access (valid for 24 hours).

```javascript
const loginResponse = await api.user.login('usernameOrEmail', 'password', true);
console.log(loginResponse.secret); // Use this token in subsequent requests
```

```javascript
const api = new RicardoNeudAPI({ secret: 'your-secret' });
```

You can revoke tokens when needed:

```javascript
await api.user.revokeSecret('usernameOrEmail', 'password', 'your-secret');
```

## Core Modules

### Games

```javascript
const server = await api.games.minecraft('play.hypixel.net');
const fivemServer = await api.games.fivem('127.0.0.1', '30120');
```

### Tools

```javascript
const dns = await api.tools.dnsCheck('example.com', 'A');
const domain = await api.tools.domainCheck('google.com');
const subdomains = await api.tools.subdomainFinder('example.com');
const geoip = await api.tools.geoIP('8.8.8.8');
```

Mail verification:

```javascript
const mail = await api.tools.mailCheck('example.com', 'selector');
const mailHost = await api.tools.mailHostCheck('example.com');
```

### Reseller

```javascript
await api.reseller.checkLicense('LICENSE_KEY');

await api.reseller.generateLicense({
  registeredTo: 'John Doe',
  domainOrIp: 'example.com',
  status: 'active',
  productId: 123,
  projectId: 456
});

await api.reseller.updateLicense('LICENSE_KEY', { status: 'inactive' });
await api.reseller.deleteLicense('LICENSE_KEY');
```

### User

```javascript
const loginResponse = await api.user.login('usernameOrEmail', 'password', true);
await api.user.revokeSecret('usernameOrEmail', 'password', 'secret-token');
```

### OAuth2

```javascript
const token = await api.oauth2.getAccessToken('code', 'redirectUri', 'clientId', 'clientSecret');
const profile = await api.oauth2.getProfile(token.access_token);
```

## Request Handling

All HTTP requests are handled internally with Axios, including error handling. Every method returns a **Promise**.

```javascript
try {
  const result = await api.tools.geoIP('8.8.8.8');
  console.log(result);
} catch (error) {
  console.error(error.status, error.message, error.data);
}
```

## TypeScript Support

```typescript
import RicardoNeudAPI, { Games, Tools, Reseller, User, OAuth2 } from '@ricardoneud.com/api';

const api = new RicardoNeudAPI({ apiKey: 'your-api-key', version: 'v4' });
```

## Notes

* You must provide either an **API Key** or a **Secret token**.
* Secret tokens expire after 24 hours and are visible in your dashboard.
* API Key and Secret are mutually exclusive; setting one clears the other.
* Always check the supported API version to ensure endpoint compatibility.
