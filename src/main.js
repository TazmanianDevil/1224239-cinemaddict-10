import {getMainMenuTemplate} from "./components/main-menu";
import {getSortTemplate} from "./components/sorting";
import {getFilmsListTemplate} from "./components/films-list";
import {getFilmCardTemplate} from "./components/film-card";
import {getUserRatingTemplate} from "./components/user-rating";
import {getLoadMoreButton} from "./components/load-more-button";
import {getFilmDetailTemplate} from "./components/film-detail";
import {generateFilters} from "./mock/filter";
import {getRandomIntegerNumber} from "./utils";
import {HIDDEN_ATTRIBUTE} from "./const";
import {generateFilms} from "./mock/film";

const TaskCounts = {
  ALL: 15,
  EXTRA: 2,
};
const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;


const getTopRatedFilms = (films) => films
  .filter((film) => film.rating > 0)
  .sort((filmA, filmB) => filmB.rating - filmA.rating)
  .slice(0, TaskCounts.EXTRA);

const getMostCommentedFilms = (films) => films
  .filter((film) => film.comments.length > 0)
  .sort((filmA, filmB) => filmB.comments.length - filmA.comments.length)
  .slice(0, TaskCounts.EXTRA);

const filmCards = generateFilms(TaskCounts.ALL);
const topRatedFilms = getTopRatedFilms(filmCards);
const mostCommentedFilms = getMostCommentedFilms(filmCards);
const filters = generateFilters(filmCards);

const render = (container, element, place = `beforeend`) => {
  container.insertAdjacentHTML(place, element);
};

const siteHeaderElement = document.querySelector(`.header`);
render(siteHeaderElement, getUserRatingTemplate(getRandomIntegerNumber(1, 100)));

const siteMainElement = document.querySelector(`.main`);
render(siteMainElement, getMainMenuTemplate(filters));
render(siteMainElement, getSortTemplate());
render(siteMainElement, getFilmsListTemplate());

const filmsListElement = document.querySelector(`.films-list .films-list__container`);
let showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;

filmCards.slice(0, showingFilmsCount).forEach((filmCard) => {
  render(filmsListElement, getFilmCardTemplate(filmCard), `beforeend`);
});
render(siteMainElement, getLoadMoreButton());

const topRatedSectionElement = document.querySelector(`.top-rated-section`);
const topRatedContainerElement = document.querySelector(`.top-rated-list-container`);
if (topRatedFilms.length === 0) {
  topRatedSectionElement.classList.add(HIDDEN_ATTRIBUTE);
} else {
  topRatedFilms.forEach((filmCard) => {
    render(topRatedContainerElement, getFilmCardTemplate(filmCard));
  });
}

const mostCommentedSectionElement = document.querySelector(`.most-commented-section`);
const mostCommentedContainerElement = document.querySelector(`.most-commented-list-container`);
if (mostCommentedFilms.length === 0) {
  mostCommentedSectionElement.classList.add(HIDDEN_ATTRIBUTE);
} else {
  mostCommentedFilms.forEach((filmCard) => {
    render(mostCommentedContainerElement, getFilmCardTemplate(filmCard));
  });
}

render(siteMainElement, getFilmDetailTemplate(filmCards[0]));

const loadMoreButton = document.querySelector(`.films-list__show-more`);
loadMoreButton.addEventListener(`click`, () => {
  const prevFilmsCount = showingFilmsCount;
  showingFilmsCount += SHOWING_FILMS_COUNT_BY_BUTTON;

  filmCards
    .slice(prevFilmsCount, showingFilmsCount)
    .forEach((filmCard) => render(filmsListElement, getFilmCardTemplate(filmCard)));

  if (showingFilmsCount >= filmCards.length) {
    loadMoreButton.remove();
  }
});
