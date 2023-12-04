// api.js

const BASE_URL = "/api";

class client {
  static instance = null;

  constructor() {
    if (client.instance) {
      return client.instance;
    }

    this.BASE_URL = BASE_URL;
    this.headers = {
      "Content-Type": "application/json",
    };

    client.instance = this;
  }

  async request(endpoint, method = "GET", data = null) {
    const url = `${this.BASE_URL}/${endpoint}`;

    const config = {
      method,
      headers: this.headers,
    };

    if (data) {
      config.body = JSON.stringify(data);
    }

    try {
      const response = await fetch(url, config);
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  }

  get(endpoint) {
    return this.request(endpoint, "GET");
  }

  post(endpoint, data) {
    return this.request(endpoint, "POST", data);
  }

  delete(endpoint) {
    return this.request(endpoint, "DELETE");
  }
}

const c = new client();
const useClient = () => c;
export default useClient;
