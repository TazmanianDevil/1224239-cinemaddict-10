import {createElement} from "../utils";

const createSingleFilterTemplate = (filter) => {
  const {name, count} = filter;

  return (
    `<a href="#${name}" class="main-navigation__item">
      ${name}
      <span class="main-navigation__item-count">${count}</span>
    </a>`
  );
};

const getMainMenuTemplate = (filters) => {
  const filtersMarkup = filters.reduce((result, filter) => {
    return result + createSingleFilterTemplate(filter);
  }, ``);

  return (
    `<nav class="main-navigation">
      <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
     ${filtersMarkup}
      <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
    </nav>`
  );
};

export default class MainMenu {
  constructor(filters) {
    this.element = null;
    this.filters = filters;
  }

  getTemplate() {
    return getMainMenuTemplate(this.filters);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
