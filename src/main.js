import {generateFilters} from "./mock/filter";
import {getRandomIntegerNumber} from "./utils";
import {generateFilms} from "./mock/film";
import UserRatingComponent from "./components/user-rating";
import MainMenuComponent from "./components/main-menu";
import SortingComponent from "./components/sorting";
import {render} from "./utils/render";
import PageController, {FilmsCounts} from "./controllers/page";


const filmCards = generateFilms(FilmsCounts.ALL);
const filters = generateFilters(filmCards);

const siteHeaderElement = document.querySelector(`.header`);
render(siteHeaderElement, new UserRatingComponent(getRandomIntegerNumber(1, 100)));

const siteMainElement = document.querySelector(`.main`);
render(siteMainElement, new MainMenuComponent(filters));
render(siteMainElement, new SortingComponent());

const pageController = new PageController(siteMainElement);

pageController.render(filmCards);
