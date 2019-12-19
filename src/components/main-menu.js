const createSingleFilterTemplate = (filter) => {
  const {name, count} = filter;

  return (
    `<a href="#${name}" class="main-navigation__item">
      ${name}
      <span class="main-navigation__item-count">${count}</span>
    </a>`
  );
};

export const getMainMenuTemplate = (filters) => {
  const filtersMarkup = filters.reduce((result, filter) => {
    return result + createSingleFilterTemplate(filter);
  }, ``);

  return (
    `<nav class="main-navigation">
      <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
     ${filtersMarkup}
      <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
    </nav>`
  );
};
