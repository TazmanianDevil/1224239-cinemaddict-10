const getProfileRating = (filmsCount) => {
  if (filmsCount > 50) {
    return `Movie expert`;
  }
  if (filmsCount > 30) {
    return `Movie buff`;
  }
  if (filmsCount > 10) {
    return `Movie adept`;
  }
  return `Movie novice`;
};

export const getUserRatingTemplate = (filmsCount) => {
  const rating = getProfileRating(filmsCount);
  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${rating}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};
