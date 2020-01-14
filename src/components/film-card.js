import AbstractComponent from "./abstract-component";

export const FILM_CARD_ACTIVE_ELEMENTS = [`film-card__poster`, `film-card__title`, `film-card__comments`];

const getFilmCardTemplate = (film) => {
  const {
    title,
    posterUrl,
    description,
    rating,
    releaseDate,
    duration,
    genres,
    comments,
  } = film;

  const year = releaseDate.getFullYear();

  return (
    `<article class="film-card">
        <h3 class="film-card__title">${title}</h3>
        <p class="film-card__rating">${rating}</p>
        <p class="film-card__info">
          <span class="film-card__year">${year}</span>
          <span class="film-card__duration">${duration}</span>
          <span class="film-card__genre">${genres}</span>
        </p>
        <img src="${posterUrl}" alt="" class="film-card__poster">
        <p class="film-card__description">${description}</p>
        <a class="film-card__comments">${comments.length} comments</a>
        <form class="film-card__controls">
          <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
          <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
          <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
        </form>
      </article>`
  );
};


export default class FilmCard extends AbstractComponent {
  constructor(film) {
    super();
    this._film = film;
  }

  getTemplate() {
    return getFilmCardTemplate(this._film);
  }

  setCardClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }

}
