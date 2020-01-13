import {createElement} from "../utils";
import AbstractComponent from "./abstract-component";

const getSortTemplate = () => {
  return (
    `<ul class="sort">
      <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
      <li><a href="#" class="sort__button">Sort by date</a></li>
      <li><a href="#" class="sort__button">Sort by rating</a></li>
    </ul>`
  );
};


export default class Sorting extends AbstractComponent {
  getTemplate() {
    return getSortTemplate();
  }

}
