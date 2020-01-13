import {remove, render} from "../utils/render";
import FilmCardComponent from "../components/film-card";
import FilmDetailComponent from "../components/film-detail";
import NoFilms from "../components/no-films";
import FilmListComponent from "../components/films-list";
import LoadMoreButtonComponent from "../components/load-more-button";
import {HIDDEN_ATTRIBUTE} from "../const";

export const FilmsCounts = {
  ALL: 15,
  EXTRA: 2,
};
const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;

const FILM_CARD_ACTIVE_ELEMENTS = [`film-card__poster`, `film-card__title`, `film-card__comments`];

const renderFilm = (film, container) => {

  const onEscapeKeyDown = (event) => {
    const isEscapeKeyDown = event.key === `Escape` || event.key === `Esc`;
    if (isEscapeKeyDown) {
      closeFilmDetail();
    }
  };

  const closeFilmDetail = () => {
    document.removeEventListener(`keydown`, onEscapeKeyDown);
    filmDetailComponent.getElement().remove();
  };

  const showFilmDetail = () => {
    render(document.body, filmDetailComponent);
    document.addEventListener(`keydown`, onEscapeKeyDown);
  };

  const filmCardComponent = new FilmCardComponent(film);
  const filmDetailComponent = new FilmDetailComponent(film);

  filmCardComponent.setCardClickHandler((event) => {
    if (FILM_CARD_ACTIVE_ELEMENTS.some((element) => event.target.classList.contains(element))) {
      showFilmDetail();
    }
  });
  filmDetailComponent.setCloseButtonClickHandler(() => {
    closeFilmDetail();
  });

  render(container, filmCardComponent);
};

const getTopRatedFilms = (films) => films
  .filter((film) => film.rating > 0)
  .sort((filmA, filmB) => filmB.rating - filmA.rating)
  .slice(0, FilmsCounts.EXTRA);

const getMostCommentedFilms = (films) => films
  .filter((film) => film.comments.length > 0)
  .sort((filmA, filmB) => filmB.comments.length - filmA.comments.length)
  .slice(0, FilmsCounts.EXTRA);

export default class PageController {
  constructor(container) {
    this._container = container;

    this._noFilmsComponent = new FilmListComponent();
    this._loadMoreButtonComponent = new LoadMoreButtonComponent();
  }

  render(films) {
    if (!films.length) {
      render(this._container, new NoFilms());
    } else {
      render(this._container, this._noFilmsComponent);
      const filmsListElement = document.querySelector(`.films-list .films-list__container`);

      let showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;

      films
        .slice(0, showingFilmsCount)
        .forEach((filmCard) => {

          renderFilm(filmCard, filmsListElement);

        });

      render(this._container, this._loadMoreButtonComponent);

      const topRatedSectionElement = document.querySelector(`.top-rated-section`);
      const topRatedContainerElement = document.querySelector(`.top-rated-list-container`);


      const topRatedFilms = getTopRatedFilms(films);
      const mostCommentedFilms = getMostCommentedFilms(films);

      if (!topRatedFilms.length) {
        topRatedSectionElement.classList.add(HIDDEN_ATTRIBUTE);
      } else {
        topRatedFilms.forEach((filmCard) => {
          renderFilm(filmCard, topRatedContainerElement);
        });
      }

      const mostCommentedSectionElement = document.querySelector(`.most-commented-section`);
      const mostCommentedContainerElement = document.querySelector(`.most-commented-list-container`);

      if (!mostCommentedFilms.length) {
        mostCommentedSectionElement.classList.add(HIDDEN_ATTRIBUTE);
      } else {
        mostCommentedFilms.forEach((filmCard) => {
          renderFilm(filmCard, mostCommentedContainerElement);
        });
      }

      this._loadMoreButtonComponent.setClickHandler(() => {
        const prevFilmsCount = showingFilmsCount;
        showingFilmsCount += SHOWING_FILMS_COUNT_BY_BUTTON;

        films
          .slice(prevFilmsCount, showingFilmsCount)
          .forEach((filmCard) => {
            renderFilm(filmCard, filmsListElement);
          });

        if (showingFilmsCount >= films.length) {
          remove(this._loadMoreButtonComponent);
        }
      });
    }

  }


}
