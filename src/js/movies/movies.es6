import Ractive from 'ractive';
import html from './movies.ract';
import _ from 'lodash';

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
      .then(response => this.ractive.set('movies', _.shuffle(response.data.movies).slice(0, 9)))
      .catch(error => console.log(error));
  }

  unrender() {
    return this.ractive.teardown();
  }
}

export default Movies;
