class MovieApi {

  constructor(http, storage, configuration) {
    this.http = http;
    this.baseUrl = configuration.api + '/discover/movie';
    this.apiKey = storage.local.get('apikey');
  }

  searchByDuration(duration) {
    let params = {
      runtimeFrom: parseInt(duration, 10) * 0.8,
      runtimeTo: parseInt(duration, 10),
      apikey: this.apiKey
    };
    return this.http.get(this.baseUrl, { params });
  }
}

export default MovieApi;
