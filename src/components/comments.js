import {createElement} from "../utils";

const createSingleCommentTemplate = (comment) => {
  const {text, emoji, author, date} = comment;

  const dateText = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDay()} ${date.getHours()}:${date.getMinutes()}`;

  return (
    `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="${emoji}" width="55" height="55" alt="emoji">
      </span>
      <div>
        <p class="film-details__comment-text">${text}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${author}</span>
          <span class="film-details__comment-day">${dateText}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`
  );
};

const getCommentsTemplate = (comments) => {
  const commentsMarkup = comments.map((comment) => createSingleCommentTemplate(comment)).join(``);

  return (
    `<ul class="film-details__comments-list">
      ${commentsMarkup}
    </ul>`
  );
};


export default class Comments {
  constructor(comments) {
    this.element = null;
    this.comments = comments;
  }

  getTemplate() {
    return getCommentsTemplate(this.comments);
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
