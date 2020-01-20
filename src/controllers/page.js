import {remove, render} from "../utils/render";
import NoFilmsComponent from "../components/no-films";
import FilmListComponent from "../components/films-list";
import LoadMoreButtonComponent from "../components/load-more-button";
import {HIDDEN_ATTRIBUTE} from "../const";
import SortComponent, {SortType} from "../components/sort";
import MovieController from "./movie";

export const FilmsCounts = {
  ALL: 15,
  EXTRA: 2,
};
const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;

const getTopRatedFilms = (films) => films
  .filter((film) => film.rating > 0)
  .sort((filmA, filmB) => filmB.rating - filmA.rating)
  .slice(0, FilmsCounts.EXTRA);

const getMostCommentedFilms = (films) => films
  .filter((film) => film.comments.length > 0)
  .sort((filmA, filmB) => filmB.comments.length - filmA.comments.length)
  .slice(0, FilmsCounts.EXTRA);

const renderFilms = (filmListElement, films, onDataChange, onViewChange) => {
  return films.map((film) => {
    const movieController = new MovieController(filmListElement, onDataChange, onViewChange);
    movieController.render(film);

    return movieController;
  });
};

export default class PageController {
  constructor(container) {
    this._container = container;
    this._films = [];
    this._showedFilmControllers = [];
    this._noFilmsComponent = new NoFilmsComponent();
    this._loadMoreButtonComponent = new LoadMoreButtonComponent();
    this._filmListComponent = new FilmListComponent();
    this._sortComponent = new SortComponent();
    this._showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;
    this._onDataChange = this._onDataChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
  }

  render(films) {
    this._films = films;

    const container = this._container;
    if (!this._films.length) {
      render(container, this._noFilmsComponent);
      return;
    }
    render(container, this._sortComponent);
    render(container, this._filmListComponent);
    const filmsListElement = document.querySelector(`.films-list .films-list__container`);

    const newFilms = renderFilms(filmsListElement, this._films.slice(0, this._showingFilmsCount), this._onDataChange, this._onViewChange);
    this._showedFilmControllers = this._showedFilmControllers.concat(newFilms);

    this._renderLoadMoreButton();

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
  }

  _renderLoadMoreButton() {
    if (this._showingFilmsCount > this._films.length) {
      return;
    }
    render(this._container, this._loadMoreButtonComponent);

    this._loadMoreButtonComponent.setClickHandler(() => {
      const prevFilmsCount = this._showingFilmsCount;
      this._showingFilmsCount += SHOWING_FILMS_COUNT_BY_BUTTON;
      const filmsListElement = document.querySelector(`.films-list .films-list__container`);

      const newFilms = renderFilms(filmsListElement, this._films.slice(prevFilmsCount, this._showingFilmsCount), this._onDataChange, this._onViewChange);
      this._showedFilmControllers = this._showedFilmControllers.concat(newFilms);

      if (this._showingFilmsCount >= this._films.length) {
        remove(this._loadMoreButtonComponent);
      }
    });
  }

  _onSortTypeChange(sortType) {
    let sortedFilms = [];

    switch (sortType) {
      case SortType.DATE:
        sortedFilms = [...this._films].sort((a, b) => b.releaseDate - a.releaseDate);
        break;
      case SortType.RATING:
        sortedFilms = [...this._films].sort((a, b) => b.rating - a.rating);
        break;
      case SortType.DEFAULT:
        sortedFilms = [...this._films];
        break;
    }
    const filmsListElement = this._filmListComponent.getElement();

    filmsListElement.innerHTML = ``;

    this._showedFilmControllers = renderFilms(filmsListElement, sortedFilms.slice(0, this._showingFilmsCount), this._onDataChange, this._onViewChange);
  }

  _onDataChange(movieController, oldData, newData) {
    const index = this._films.findIndex((element) => element === oldData);

    if (index === -1) {
      return;
    }

    this._films = [].concat(this._films.slice(0, index), newData, this._films.slice(index + 1));

    movieController.rerender(this._films[index]);
  }

  _onViewChange() {
    this._showedFilmControllers.forEach((element) => element.setDefaultView());
  }
}
