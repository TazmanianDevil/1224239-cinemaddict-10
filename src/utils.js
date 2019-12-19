export const MIN_MONTH_NUMBER = 0;
export const MAX_MONTH_NUMBER = 11;
export const MIN_DAY_NUMBER = 1;
export const MAX_DAY_NUMBER = 30;
export const MIN_HOURS = 0;
export const MAX_HOURS = 10;
export const MIN_MINUTES = 0;
export const MAX_MINUTES = 59;
export const MIN_COMMENTS_COUNT = 1;
export const MAX_COMMENTS_COUNT = 10;

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

export const COMMENT_TEXT = [
  `Interesting setting and a good cast`,
  `Booooooooooring`,
  `Very very old. Meh`,
  `Almost two hours? Seriously?`,
];

export const COMMENT_EMOJI = [
  `./images/emoji/angry.png`,
  `./images/emoji/puke.png`,
  `./images/emoji/sleeping.png`,
  `./images/emoji/smile.png`,
  `./images/emoji/trophy.png`,
];

export const COMMENT_AUTHOR_NAMES = [
  `Tim Macoveev`,
  `John Doe`,
  `Arnold Hopkins`,
  `Timotey Dalton`,
  `Andrew O'Brayen`,
];

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
