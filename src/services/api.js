class ApiService {
  baseUrl = '';

  constructor (baseUrl) {
    this.baseUrl = baseUrl;
  }

  async get(requestParams) {
    const queryString = requestParams.join('/');

    let response = null;

    const url = `${this.baseUrl}/${queryString}`;

    try {
      response = await fetch(url);

    } catch (err) {
      throw new Error(err);
    }

    const movieData = await response.json();

    return movieData;
  }
}

export default ApiService;