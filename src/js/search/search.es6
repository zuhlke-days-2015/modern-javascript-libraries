import Ractive from 'ractive';
import html from './search.ract';

class Search {

  constructor(googleApi, events) {
    this.googleApi = googleApi;
    this.events = events;
  }

  render() {
    this.ractive = new Ractive({
      el: 'view',
      template: html,
      data: {
        loading: false
      }
    });

    this.ractive.on('searchMovie', () => this.searchMovie(this.ractive.get('origin'), this.ractive.get('destination')));
  }

  toggleSpinner() {
    this.ractive.set('loading', !this.ractive.get('loading'));
  }

  searchMovie(origin, destination) {
    this.toggleSpinner();

    this.googleApi.search(origin, destination).then(result => {
      this.toggleSpinner();

      var duration = result.routes[0].legs[0].duration.value;
      this.events.routing.transitionTo.dispatch('movies/' + duration, this);
    });
  }

  unrender() {
    return this.ractive.teardown();
  }
}

export default Search;
