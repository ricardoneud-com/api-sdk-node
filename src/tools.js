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

module.exports = Tools;
