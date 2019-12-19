import {
  createRandomComments,
  getRandomArrayItem,
  getRandomBoolean,
  getRandomDate,
  getRandomDuration,
  getRandomIntegerNumber,
  getRandomPeople,
} from "../utils";

export const MIN_DESCRIPTION_SIZE = 1;
export const MAX_DESCRIPTION_SIZE = 3;
export const MIN_RATING = 1;
export const MAX_RATING = 9;
export const MIN_WRITERS_COUNT = 1;
export const MAX_WRITERS_COUNT = 3;
export const MIN_ACTORS_COUNT = 1;
export const MAX_ACTORS_COUNT = 4;

export const FILM_TITLES = [
  `Star wars. Episode 1`,
  `Star wars. Episode 2`,
  `Star wars. Episode 3`,
  `Star wars. Episode 4`,
  `Star wars. Episode 5`,
  `Star wars. Episode 6`,
  `Lord of the rings. The Fellowship of the Ring`,
  `Lord of the rings. The Two Towers`,
  `Lord of the ring. The Return of the King`,
  `12 angry men`,
  `Walk the line`,
  `Ray`,
  `The Shawshank Redemption`,
  `Kimi no na wa`,
  `Sen to Chihiro no kamikakushi`,
  `Intouchables `,
  `Whiplash `,
];

export const ORIGINAL_FILM_TITLES = [
  `Original: Star wars. Episode 1`,
  `Original: Star wars. Episode 2`,
  `Original: Star wars. Episode 3`,
  `Original: Star wars. Episode 4`,
  `Original: Star wars. Episode 5`,
  `Original: Star wars. Episode 6`,
  `Original: Lord of the rings. The Fellowship of the Ring`,
  `Original: Lord of the rings. The Two Towers`,
  `Original: Lord of the ring. The Return of the King`,
  `Original: 12 angry men`,
  `Original: Walk the line`,
  `Original: Ray`,
  `Original: The Shawshank Redemption`,
  `Original: Kimi no na wa`,
  `Original: Sen to Chihiro no kamikakushi`,
  `Original: Intouchables `,
  `Original: Whiplash `,
];

export const FILM_DESCRIPTIONS = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta 
ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc 
ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales 
efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi
 sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac 
 purus sit amet tempus.`.split(`. `);

export const FILM_IMAGES = [
  `./images/posters/made-for-each-other.png`,
  `./images/posters/popeye-meets-sinbad.png`,
  `./images/posters/sagebrush-trail.jpg`,
  `./images/posters/santa-claus-conquers-the-martians.jpg`,
  `./images/posters/the-dance-of-life.jpg`,
  `./images/posters/the-great-flamarion.jpg`,
  `./images/posters/the-man-with-the-golden-arm.jpg`,
];

export const GENRES = [
  `Action`, `Adventure`, `Comedy`, `Crime`, `Drama`, `Fantasy`, `Historical`, `Horror`, `Mystery`, `Political`,
];

export const DIRECTORS = [
  `Frank Darabont`,
  `Robert Zemeckis`,
  `Martin Scorsese`,
  `Alfred Hitchcock`,
  `Steven Spielberg`,
  `Roman Polanski`,
  `Ridley Scott`,
  `Tony Scott`,
  `James Cameron`,
  `Quentin Tarantino`,
  `Francis Ford Coppola`,
  `Stanley Kubrick`,
];

export const WRITERS = [
  `Quentin Tarantino`,
  `Woody Allen`,
  `Billy Wilder`,
  `Akira Kurosawa`,
  `Oliver Stone`,
  `Francis Ford Coppola`,
  `Joel Coen`,
  `Ethan Coen`,
  `Mel Brooks`,
  `Aaron Sorkin`,
];

export const ACTORS = [
  `Jack Nicholson`,
  `Marlon Brando`,
  `Robert De Niro`,
  `Al Pacino`,
  `Daniel Day-Lewis`,
  `Dustin Hoffman`,
  `Tom Hanks`,
  `Anthony Hopkins`,
  `Paul Newman`,
  `Denzel Washington`,
];

export const COUNTRIES = [
  `France`,
  `Italy`,
  `USA`,
  `Spain`,
];

export const AGE_LIMITS = [`0+`, `3+`, `12+`, `16+`, `18+`];

const getRandomDescription = () => {
  const sentenceCount = getRandomIntegerNumber(MIN_DESCRIPTION_SIZE, MAX_DESCRIPTION_SIZE);
  const randomDescriptionSentences = new Set();
  let i = 0;
  while (i <= sentenceCount) {
    const part = getRandomArrayItem(FILM_DESCRIPTIONS);
    if (!randomDescriptionSentences.has(part)) {
      randomDescriptionSentences.add(part);
      i++;
    }
  }
  return [...randomDescriptionSentences].join(`. `);
};

export const generateFilm = () => {
  return {
    title: getRandomArrayItem(FILM_TITLES),
    originalTitle: getRandomArrayItem(ORIGINAL_FILM_TITLES),
    posterUrl: getRandomArrayItem(FILM_IMAGES),
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
