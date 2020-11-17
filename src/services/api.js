class ApiService {
  baseUrl = '';

  constructor (baseUrl) {
    this.baseUrl = baseUrl;
  }

  async get(routeParams, queryParams) {
    const route = routeParams.join('/');
    const query = queryParams.join('&');

    let response = null;

    const url = `${this.baseUrl}/${route}?${query}`;

    try {
      response = await fetch(url);

    } catch (err) {
      throw new Error(err);
    }

    const data = await response.json();

    return {
      data,
      headers: response.headers
    }
  }
}

export default ApiService;