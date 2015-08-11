import Ractive from 'ractive';
import html from './movies.ract';

class Movies {

  constructor(movieApi) {
    this.movieApi = movieApi;
  }

  render(duration) {
    this.ractive = new Ractive({
      el: 'view',
      template: html
    });

    this.movieApi.searchByDuration(duration)
      .then(response => this.ractive.set('movies', response.data.movies))
      .catch(error => console.log(error));
  }

  unrender() {
    return this.ractive.teardown();
  }
}

export default Movies;
