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

module.exports = Reseller;
