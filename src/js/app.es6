import configuration from 'configuration';

import Ractive from 'ractive';
Ractive.DEBUG = configuration.ractiveDebug;

import parsleyDecorator from './services/parsley-ractive-decorator.es6';
Ractive.decorators.parsley = parsleyDecorator;

import Router from './services/router.es6';
import events from './services/events.es6';
import storage from './services/storage.es6';
import http from 'axios';

import GoogleApi from './services/google-api.es6';
import MovieApi from './services/movie-api.es6';
import Movies from './movies/movies.es6';
import Search from './search/search.es6';
import Sorry from './sorry/sorry.es6';
import NotFound from './404/404.es6';

let movieApi = new MovieApi(http, storage, configuration);
let router = new Router(events);

router.addRoute('search', new Search(new GoogleApi(), events));
router.addRoute('movies/{duration}', new Movies(new MovieApi(http, storage, configuration)));
router.addRoute('sorry', new Sorry());
router.addRoute('404', new NotFound());

router.initialise();
router.transitionTo('/search');

events.routing.notFound.add(() => router.transitionTo('404'));
events.routing.transitionTo.add((path, view) => view.unrender().then(() => router.transitionTo(path)));
