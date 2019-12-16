import {
  createRandomComments,
  getRandomArrayItem,
  getRandomBoolean,
  getRandomDate,
  getRandomDuration,
  getRandomIntegerNumber,
  getRandomPeople,
} from "../utils";
import {
  ACTORS,
  AGE_LIMITS,
  COUNTRIES,
  DIRECTORS,
  FILM_DESCRIPTIONS,
  FILM_IMAGES,
  FILM_TITLES,
  GENRES,
  MAX_ACTORS_COUNT,
  MAX_DESCRIPTION_SIZE,
  MAX_RATING,
  MAX_WRITERS_COUNT,
  MIN_ACTORS_COUNT,
  MIN_DESCRIPTION_SIZE,
  MIN_RATING,
  MIN_WRITERS_COUNT,
  ORIGINAL_FILM_TITLES,
  WRITERS,
} from "./const";

const getRandomDescription = () => {
  const sentenceCount = getRandomIntegerNumber(MIN_DESCRIPTION_SIZE, MAX_DESCRIPTION_SIZE);
  const descriptionSet = new Set();
  let i = 0;
  while (i <= sentenceCount) {
    const part = getRandomArrayItem(FILM_DESCRIPTIONS);
    if (!descriptionSet.has(part)) {
      descriptionSet.add(part);
      i++;
    }
  }
  return [...descriptionSet].join(`. `);
};

export const generateFilm = () => {
  return {
    title: getRandomArrayItem(FILM_TITLES),
    originalTitle: getRandomArrayItem(ORIGINAL_FILM_TITLES),
    poster: getRandomArrayItem(FILM_IMAGES),
    description: getRandomDescription(),
    rating: getRandomIntegerNumber(MIN_RATING, MAX_RATING).toFixed(1),
    releaseDate: getRandomDate(),
    duration: getRandomDuration(),
    country: getRandomArrayItem(COUNTRIES),
    genres: [getRandomArrayItem(GENRES)],
    isWatched: getRandomBoolean(),
    isInWatchlist: getRandomBoolean(),
    isFavorite: getRandomBoolean(),
    ageLimit: getRandomArrayItem(AGE_LIMITS),
    director: getRandomArrayItem(DIRECTORS),
    writers: getRandomPeople(WRITERS, MIN_WRITERS_COUNT, MAX_WRITERS_COUNT),
    actors: getRandomPeople(ACTORS, MIN_ACTORS_COUNT, MAX_ACTORS_COUNT),
    comments: createRandomComments(),
  };
};

export const generateFilms = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateFilm);
};
