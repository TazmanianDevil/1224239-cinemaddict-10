import {createElement} from "../utils";

const getFilmsListTemplate = () => {
  return (
    `<section class="films">
    <section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>

      <div class="films-list__container"></div>
    </section>

    <section class="films-list--extra top-rated-section">
      <h2 class="films-list__title">Top rated</h2>

      <div class="films-list__container top-rated-list-container"></div>
    </section>

    <section class="films-list--extra most-commented-section">
      <h2 class="films-list__title">Most commented</h2>

      <div class="films-list__container most-commented-list-container"></div>
    </section>
  </section>`
  );
};


export default class FilmList {
  constructor() {
    this.element = null;
  }

  getTemplate() {
    return getFilmsListTemplate();
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
