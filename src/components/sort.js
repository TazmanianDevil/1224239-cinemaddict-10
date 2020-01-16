import AbstractComponent from "./abstract-component";

export const SortType = {
  DEFAULT: `default`,
  DATE: `date`,
  RATING: `rating`,
};

const ACTIVE_SORT_BUTTON_CLASS = `sort__button--active`;

const getSortTemplate = (sotTypes, defaultSortType = SortType.DEFAULT) => {
  const sortTypesMarkup = sotTypes.map((sortType) => {
    const activeSortClass = defaultSortType === sortType ? ACTIVE_SORT_BUTTON_CLASS : ``;
    return (
      `<li><a href="#" class="sort__button ${activeSortClass}" data-sort-type="${sortType}">Sort by ${sortType}</a></li>`
    );
  }).join(``);
  return (
    `<ul class="sort">
      ${sortTypesMarkup}
    </ul>`
  );
};

export default class Sort extends AbstractComponent {
  constructor() {
    super();
    this._currentSortType = SortType.DEFAULT;
  }

  getTemplate() {
    return getSortTemplate([SortType.DEFAULT, SortType.DATE, SortType.RATING]);
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

      changeActiveSortButton(event);
      handler(this._currentSortType);
    });

    const changeActiveSortButton = (event) => {
      if (this._element === null) {
        return;
      }
      const activeSortButton = this._element.querySelector(`.${ACTIVE_SORT_BUTTON_CLASS}`);
      activeSortButton.classList.remove(ACTIVE_SORT_BUTTON_CLASS);
      event.target.classList.add(ACTIVE_SORT_BUTTON_CLASS);
    };
  }

}
