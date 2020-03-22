import { pubsub } from './pubsub.js';

export const movies = {
  list: [],
  render: container => {
    let template = document.getElementById('movieListTemplate');
    let div = template.content.cloneNode(true);
    container.appendChild(div);
    let ul = document.querySelector('.movie-container ul');
    ul.addEventListener('click', movies.movieDeleted);

    //listen for movieAdded messages
    console.log('MOVIES: event subscribe movieAdded');
    pubsub.subscribe('movieAdded', movies.movieAdded);
  },
  movieAdded: title => {
    //use Set to prevent duplicates
    console.log(`MOVIES: ${title} was just added`);
    let list = new Set(movies.list);
    list.add(title);
    movies.list = Array.from(list).sort();

    //then update the ui with the new list
    let ul = document.querySelector('.movie-container ul');
    ul.innerHTML = '';
    let df = document.createDocumentFragment();
    movies.list.forEach(title => {
      let li = document.createElement('li');
      li.innerText = title;
      df.appendChild(li);
    });
    ul.appendChild(df);

    //tell anyone who is listening that the movie list was updated
    console.log(`MOVIES: event publish moviesUpdated`);
    pubsub.publish('moviesUpdated', movies.list);    
  },
  movieDeleted: ev => {
    let item = ev.target.closest('li');
    let name = item.textContent;
    movies.list = movies.list.filter(nm => nm !== name);
    item.parentElement.removeChild(item);
    pubsub.publish('movieDeleted', movies.list);
  }
};
