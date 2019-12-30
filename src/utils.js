import {COMMENT_AUTHOR_NAMES, COMMENT_EMOJI, COMMENT_TEXT, MAX_COMMENTS_COUNT, MIN_COMMENTS_COUNT} from "./mock/mock";
import {RenderPosition} from "./const";

export const getRandomArrayItem = (array) => {
  const index = Math.floor(array.length * Math.random());
  return array[index];
};

export const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor((max - min) * Math.random());
};

const formatterOptions = {
  day: `numeric`,
  month: `long`,
  year: `numeric`,
};

const dateFormatter = new Intl.DateTimeFormat(`en-GB`, formatterOptions);

export const formatDate = (date) => dateFormatter.format(date);

export const getRandomDate = () => {
  const year = getRandomIntegerNumber(1935, 2015);
  const month = getRandomIntegerNumber(0, 11);
  const day = getRandomIntegerNumber(1, 30);
  const hour = getRandomIntegerNumber(0, 10);
  const minute = getRandomIntegerNumber(0, 59);
  return new Date(year, month, day, hour, minute);
};

export const getRandomBoolean = () => Math.random() > 0.5;

export const getRandomDuration = () => {
  const hours = getRandomIntegerNumber(0, 10);
  const minutes = getRandomIntegerNumber(0, 59);

  return `${hours}h ${minutes}m`;
};

export const getRandomPeople = (array, min, max) => {
  const peopleCount = getRandomIntegerNumber(min, max);
  let i = 0;
  const randomPeople = new Set();
  while (i < peopleCount) {
    const man = getRandomArrayItem(array);
    if (!randomPeople.has(man)) {
      randomPeople.add(man);
      i++;
    }
  }
  return [...randomPeople];
};

export const createRandomComments = () => {
  const comments = [];
  const commentsCount = getRandomIntegerNumber(MIN_COMMENTS_COUNT, MAX_COMMENTS_COUNT);
  for (let i = 0; i < commentsCount; i++) {
    comments.push(createRandomComment());
  }
  return comments;
};

const createRandomComment = () => {
  return {
    emoji: getRandomArrayItem(COMMENT_EMOJI),
    text: getRandomArrayItem(COMMENT_TEXT),
    author: getRandomArrayItem(COMMENT_AUTHOR_NAMES),
    date: getRandomDate(),
  };
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const render = (container, element, place = RenderPosition.BEFORE_END) => {
  switch (place) {
    case RenderPosition.AFTER_BEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFORE_END:
      container.append(element);
      break;
  }
};
