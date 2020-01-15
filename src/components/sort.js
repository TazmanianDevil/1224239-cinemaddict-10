import AbstractComponent from "./abstract-component";

export const SortType = {
  DEFAULT: `default`,
  DATE: `date`,
  RATING: `rating`,
};
const getSortTemplate = () => {
  return (
    `<ul class="sort">
      <li><a href="#" class="sort__button sort__button--active" data-sort-type="${SortType.DEFAULT}">Sort by default</a></li>
      <li><a href="#" class="sort__button" data-sort-type="${SortType.DATE}">Sort by date</a></li>
      <li><a href="#" class="sort__button" data-sort-type="${SortType.RATING}">Sort by rating</a></li>
    </ul>`
  );
};


export default class Sort extends AbstractComponent {
  getTemplate() {
    return getSortTemplate();
  }

  setSortTypeChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (event) => {
      event.preventDefault();

      if (event.target.tagName !== `A`) {
        return;
      }

      const sortType = event.target.dataset.sortType;
      if (this._currentSortType === sortType) {
        return;
      }

      this._currentSortType = sortType;
      handler(this._currentSortType);
    });
  }

}
