import {
  COMMENT_AUTHOR_NAMES, COMMENT_EMOJI, COMMENT_TEXT, MAX_COMMENTS_COUNT,
  MAX_DAY_NUMBER,
  MAX_HOURS, MAX_MINUTES,
  MAX_MONTH_NUMBER, MIN_COMMENTS_COUNT,
  MIN_DAY_NUMBER,
  MIN_HOURS, MIN_MINUTES,
  MIN_MONTH_NUMBER,
} from "./mock/const";

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
  const month = getRandomIntegerNumber(MIN_MONTH_NUMBER, MAX_MONTH_NUMBER);
  const day = getRandomIntegerNumber(MIN_DAY_NUMBER, MAX_DAY_NUMBER);
  const hour = getRandomIntegerNumber(MIN_HOURS, MAX_HOURS);
  const minute = getRandomIntegerNumber(0, 59);
  return new Date(year, month, day, hour, minute);
};

export const getRandomBoolean = () => Math.random() > 0.5;

export const getRandomDuration = () => {
  const hours = getRandomIntegerNumber(MIN_HOURS, MAX_HOURS);
  const minutes = getRandomIntegerNumber(MIN_MINUTES, MAX_MINUTES);

  return `${hours}h ${minutes}m`;
};

export const getRandomPeople = (array, min, max) => {
  const peopleCount = getRandomIntegerNumber(min, max);
  let i = 0;
  const peopleSet = new Set();
  while (i < peopleCount) {
    const man = getRandomArrayItem(array);
    if (!peopleSet.has(man)) {
      peopleSet.add(man);
      i++;
    }
  }
  return [...peopleSet];
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
