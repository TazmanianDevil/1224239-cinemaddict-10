import {generateFilters} from "./mock/filter";
import {getRandomIntegerNumber, render} from "./utils";
import {HIDDEN_ATTRIBUTE} from "./const";
import {generateFilms} from "./mock/film";
import UserRatingComponent from "./components/user-rating";
import MainMenuComponent from "./components/main-menu";
import SortingComponent from "./components/sorting";
import FilmListComponent from "./components/films-list";
import FilmCardComponent from "./components/film-card";
import LoadMoreButtonComponent from "./components/load-more-button";
import FilmDetailComponent from "./components/film-detail";

const FilmsCounts = {
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

const renderFilm = (film, container) => {
  const filmCardComponent = new FilmCardComponent(film);
  const filmDetailComponent = new FilmDetailComponent(film);

  const filmActiveElements = filmCardComponent.getElement().querySelectorAll(`.film-card__poster, .film-card__title, .film-card__comments`);
  filmActiveElements
    .forEach((element) => {
      element.addEventListener(`click`, () => render(siteMainElement, filmDetailComponent.getElement()));
    });

  const closeButtonElementElement = filmDetailComponent.getElement().querySelector(`.film-details__close-btn`);

  closeButtonElementElement.addEventListener(`click`, () => {
    filmDetailComponent.getElement().remove();
  });

  render(container, filmCardComponent.getElement());
};

const filmCards = generateFilms(FilmsCounts.ALL);
const topRatedFilms = getTopRatedFilms(filmCards);
const mostCommentedFilms = getMostCommentedFilms(filmCards);
const filters = generateFilters(filmCards);

const siteHeaderElement = document.querySelector(`.header`);
render(siteHeaderElement, new UserRatingComponent(getRandomIntegerNumber(1, 100)).getElement());

const siteMainElement = document.querySelector(`.main`);
render(siteMainElement, new MainMenuComponent(filters).getElement());
render(siteMainElement, new SortingComponent().getElement());
render(siteMainElement, new FilmListComponent().getElement());

const filmsListElement = document.querySelector(`.films-list .films-list__container`);

let showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;

filmCards
  .slice(0, showingFilmsCount)
  .forEach((filmCard) => {

    renderFilm(filmCard, filmsListElement);

  });

render(siteMainElement, new LoadMoreButtonComponent().getElement());

const topRatedSectionElement = document.querySelector(`.top-rated-section`);
const topRatedContainerElement = document.querySelector(`.top-rated-list-container`);

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

const loadMoreButton = document.querySelector(`.films-list__show-more`);
loadMoreButton.addEventListener(`click`, () => {
  const prevFilmsCount = showingFilmsCount;
  showingFilmsCount += SHOWING_FILMS_COUNT_BY_BUTTON;

  filmCards
    .slice(prevFilmsCount, showingFilmsCount)
    .forEach((filmCard) => {
      renderFilm(filmCard, filmsListElement);
    });

  if (showingFilmsCount >= filmCards.length) {
    loadMoreButton.remove();
  }
});
