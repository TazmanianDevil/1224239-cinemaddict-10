import {getMainMenuTemplate} from "./components/main-menu";
import {getSortTemplate} from "./components/sorting";
import {getFilmsListTemplate} from "./components/films-list";
import {getFilmCardTemplate} from "./components/film-card";
import {getUserRatingTemplate} from "./components/user-rating";
import {getLoadMoreButton} from "./components/load-more-button";
import {getFilmDetailTemplate} from "./components/film-detail";

const TaskCounts = {
  ALL: 5,
  EXTRA: 2,
};

const render = (container, element, place = `beforeend`) => {
  container.insertAdjacentHTML(place, element);
};

const siteHeaderElement = document.querySelector(`.header`);
render(siteHeaderElement, getUserRatingTemplate());

const siteMainElement = document.querySelector(`.main`);
render(siteMainElement, getMainMenuTemplate());
render(siteMainElement, getSortTemplate());
render(siteMainElement, getFilmsListTemplate());

const filmsListElement = document.querySelector(`.films-list .films-list__container`);
for (let i = 0; i < TaskCounts.ALL; i++) {
  render(filmsListElement, getFilmCardTemplate());
}
render(siteMainElement, getLoadMoreButton());

const extraFilmsElements = document.querySelectorAll(`.films-list--extra`);
extraFilmsElements.forEach(
    (elements) => {
      const extraFilmContainer = elements.querySelector(`.films-list__container`);
      for (let i = 0; i < TaskCounts.EXTRA; i++) {
        render(extraFilmContainer, getFilmCardTemplate());
      }
    }
);

render(siteMainElement, getFilmDetailTemplate());
