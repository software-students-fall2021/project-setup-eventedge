const axios = require('axios');

// request service instance for axios (proxying mockaroo)

class RequestService {
  constructor() {
    this.client = axios.create({
      baseURL: 'https://my.api.mockaroo.com',
      headers: {'X-API-Key': process.env.MOCKAROO_API_KEY},
    });
  }

  async request(method, url) {
    try {
      const {data} = await this.client.request({method, url, data: this.body});

      return data;
    } catch (error) {
      console.error(`Error: ${error}`);

      throw error;
    }
  }

  withBody(body) {
    this.body = body;

    return this;
  }

  get(url) {
    return this.request('GET', url);
  }

  post(url) {
    return this.request('POST', url);
  }
}

module.exports = {
  request: () => new RequestService(),
};
