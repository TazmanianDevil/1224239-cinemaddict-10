import {remove, render} from "../utils/render";
import FilmCardComponent from "../components/film-card";
import FilmDetailComponent from "../components/film-detail";
import NoFilmsComponent from "../components/no-films";
import FilmListComponent from "../components/films-list";
import LoadMoreButtonComponent from "../components/load-more-button";
import {HIDDEN_ATTRIBUTE} from "../const";
import SortComponent, {SortType} from "../components/sort";

export const FilmsCounts = {
  ALL: 15,
  EXTRA: 2,
};
const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;

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

  filmCardComponent.setCardClickHandler(showFilmDetail);
  filmDetailComponent.setCloseButtonClickHandler(closeFilmDetail);

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

const renderFilms = (filmListElement, films) => {
  films.forEach((film) => {
    renderFilm(film, filmListElement);
  });
};

export default class PageController {
  constructor(container) {
    this._container = container;

    this._noFilmsComponent = new NoFilmsComponent();
    this._loadMoreButtonComponent = new LoadMoreButtonComponent();
    this._filmListComponent = new FilmListComponent();
    this._sortComponent = new SortComponent();
  }

  render(films) {

    const renderLoadMoreButton = () => {
      if (showingFilmsCount > films.length) {
        return;
      }
      render(container, this._loadMoreButtonComponent);

      this._loadMoreButtonComponent.setClickHandler(() => {
        const prevFilmsCount = showingFilmsCount;
        showingFilmsCount += SHOWING_FILMS_COUNT_BY_BUTTON;

        renderFilms(filmsListElement, films.slice(prevFilmsCount, showingFilmsCount));

        if (showingFilmsCount >= films.length) {
          remove(this._loadMoreButtonComponent);
        }
      });
    };

    const container = this._container;
    if (!films.length) {
      render(container, this._noFilmsComponent);
      return;
    }
    render(container, this._sortComponent);
    render(container, this._filmListComponent);
    const filmsListElement = document.querySelector(`.films-list .films-list__container`);

    let showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;

    renderFilms(filmsListElement, films.slice(0, showingFilmsCount));

    renderLoadMoreButton();

    const topRatedSectionElement = document.querySelector(`.top-rated-section`);
    const topRatedContainerElement = document.querySelector(`.top-rated-list-container`);


    const topRatedFilms = getTopRatedFilms(films);
    const mostCommentedFilms = getMostCommentedFilms(films);

    if (!topRatedFilms.length) {
      topRatedSectionElement.classList.add(HIDDEN_ATTRIBUTE);
    } else {
      renderFilms(topRatedContainerElement, topRatedFilms);
    }

    const mostCommentedSectionElement = document.querySelector(`.most-commented-section`);
    const mostCommentedContainerElement = document.querySelector(`.most-commented-list-container`);

    if (!mostCommentedFilms.length) {
      mostCommentedSectionElement.classList.add(HIDDEN_ATTRIBUTE);
    } else {
      renderFilms(mostCommentedContainerElement, mostCommentedFilms);
    }

    this._sortComponent.setSortTypeChangeHandler((sortType) => {
      let sortedFilms = [];

      switch (sortType) {
        case SortType.DATE:
          sortedFilms = films.slice().sort((a, b) => b.releaseDate - a.releaseDate);
          break;
        case SortType.RATING:
          sortedFilms = films.slice().sort((a, b) => b.rating - a.rating);
          break;
        case SortType.DEFAULT:
          sortedFilms = films.slice(0, showingFilmsCount);
          break;
      }
      filmsListElement.innerHTML = ``;

      renderFilms(filmsListElement, sortedFilms);

      if (SortType.DEFAULT === sortType) {
        renderLoadMoreButton();
      } else {
        remove(this._loadMoreButtonComponent);
      }
    });
  }

}
