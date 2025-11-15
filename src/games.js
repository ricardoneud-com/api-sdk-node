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

module.exports = Games;
