import {generateFilters} from "./mock/filter";
import {getRandomIntegerNumber} from "./utils";
import {generateFilms} from "./mock/film";
import UserRatingComponent from "./components/user-rating";
import MainMenuComponent from "./components/main-menu";
import {render} from "./utils/render";
import PageController, {FilmsCounts} from "./controllers/page-controller";


const filmCards = generateFilms(FilmsCounts.ALL);
const filters = generateFilters(filmCards);

const siteHeaderElement = document.querySelector(`.header`);
render(siteHeaderElement, new UserRatingComponent(getRandomIntegerNumber(1, 100)));

const siteMainElement = document.querySelector(`.main`);
render(siteMainElement, new MainMenuComponent(filters));

const pageController = new PageController(siteMainElement);

pageController.render(filmCards);
