import {createElement} from "../utils";

const getLoadMoreButton = () => {
  return (
    `<button class="films-list__show-more">Show more</button>`
  );
};

export default class LoadMoreButton {
  constructor() {
    this.element = null;
  }

  getTemplate() {
    return getLoadMoreButton();
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
