import { pubsub } from './pubsub.js';

export const stats = {
  render: container => {
    let d = document.createElement('div');
    d.className = 'stats-container';
    container.appendChild(d);
    let pm = document.createElement('p');
    pm.className = 'movie-count';
    pm.innerHTML = `0 movies in list`;
    d.appendChild(pm);
    let pa = document.createElement('p');
    pa.className = 'actor-count';
    pa.innerHTML = `0 actors in list`;
    d.appendChild(pa);

    //build stats for movies
    pubsub.subscribe('moviesUpdated', stats.moviesUpdated);
    console.log('STATS: event subcribe moviesUpdated');

    //build stats for actors
    pubsub.subscribe('actorsUpdated', stats.actorsUpdated);
    console.log('STATS: event subscribe actorsUpdated');

    pubsub.subscribe('actorDeleted', stats.actorsUpdated);
    console.log('STATS: event subscribe actorDeleted');

    pubsub.subscribe('movieDeleted', stats.moviesUpdated);
    console.log('STATS: event subscribe movieDeleted');
  },
  moviesUpdated: list => {
    //the list of movies was just published as updated
    console.log(
      `STATS: Movie list now has ${list.length} ${ list.length != 1 ? 'titles' : 'title'}.`
    );
    document.querySelector(
      '.movie-count'
    ).innerText = `${list.length} ${list.length != 1 ? 'movies' : 'movie'} in list`;
  },
  actorsUpdated: list => {
    console.log(
      `STATS: Actor list now has ${list.length} ${list.length != 1 ? 'names' : 'name'}.`
    );
    document.querySelector(
      '.actor-count'
    ).innerText = `${list.length} ${list.length != 1 ? 'names' : 'name'} in list`;
  }
};
