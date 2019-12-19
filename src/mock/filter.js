export const FILTER_NAMES = [
  `watchlist`,
  `history`,
  `favorites`,
];

const getCount = (name, filmCards) => {
  switch (name) {
    case `watchlist`:
      return filmCards.reduce((result, {isInWatchlist}) => {
        return isInWatchlist ? result + 1 : result;
      }, 0);
    case `history`:
      return filmCards.reduce((result, {isWatched}) => {
        return isWatched ? result + 1 : result;
      }, 0);
    case `favorites`:
      return filmCards.reduce((result, {isFavorite}) => {
        return isFavorite ? result + 1 : result;
      }, 0);
    default:
      return 0;
  }
};

const generateFilter = (name, filmCards) => ({
  name,
  count: getCount(name, filmCards),
});

export const generateFilters = (filmCards) => {
  return FILTER_NAMES.map((name) => generateFilter(name, filmCards));
};
