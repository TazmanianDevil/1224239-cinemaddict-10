import FilmCard from "../components/film-card";
import FilmDetail from "../components/film-detail";
import {render} from "../utils/render";

export default class MovieController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._film = {};
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._filmComponent = null;
    this._filmDetailComponent = null;

    this._onFilmDetailEscPress = this._onFilmDetailEscPress.bind(this);
    this._closeFilmDetail = this._closeFilmDetail.bind(this);
    this._onFilmCardElementClick = this._onFilmCardElementClick.bind(this);
  }

  render(film) {
    this._film = film;
    this._filmComponent = new FilmCard(film);

    render(this._container, this._filmComponent);

    this._setFilmComponentClickHandlers(film);
  }

  rerender(film) {
    this._film = film;
    this._filmComponent.rerender(this._filmComponent, film);
    if (this._filmDetailComponent) {
      this._filmDetailComponent.rerender(this._filmDetailComponent, film);
      this._filmDetailComponent.setCloseButtonClickHandler(this._closeFilmDetail);
      this._setFilmDetailComponentClickHandlers(film);
    }

    this._setFilmComponentClickHandlers(film);
  }

  _setFilmComponentClickHandlers(film) {
    this._filmComponent.setCardClickHandler(this._onFilmCardElementClick);

    this._filmComponent.setWatchlistButtonClickHandler((event) => {
      event.preventDefault();
      this._onDataChange(film, Object.assign({}, film, {
        watchlist: !film.watchlist,
      }));
    });

    this._filmComponent.setWatchedButtonClickHandler((event) => {
      event.preventDefault();
      this._onDataChange(film, Object.assign({}, film, {
        watched: !film.watched,
      }));
    });

    this._filmComponent.setFavoritesButtonClickHandler((event) => {
      event.preventDefault();
      this._onDataChange(film, Object.assign({}, film, {
        favorite: !film.favorite,
      }));
    });
  }

  _setFilmDetailComponentClickHandlers(film) {
    this._filmDetailComponent.setWatchlistInputClickHandler((event) => {
      event.preventDefault();
      this._onDataChange(film, Object.assign({}, film, {
        isInWatchlist: !film.isInWatchlist,
      }));
    });

    this._filmDetailComponent.setWatchedInputClickHandler((event) => {
      event.preventDefault();
      this._onDataChange(film, Object.assign({}, film, {
        isWatched: !film.isWatched,
      }));
    });

    this._filmDetailComponent.setFavoritesInputClickHandler((event) => {
      event.preventDefault();
      this._onDataChange(film, Object.assign({}, film, {
        isFavorite: !film.isFavorite,
      }));
    });
  }

  _closeFilmDetail() {
    if (this._filmDetailComponent) {
      this._filmDetailComponent.getElement().remove();
      document.removeEventListener(`keydown`, this._onFilmDetailEscPress);
    }
  }

  _onFilmDetailEscPress(event) {
    const isEscapeKeyDown = event.key === `Escape` || event.key === `Esc`;
    if (isEscapeKeyDown) {
      this._closeFilmDetail();
    }
  }

  _onFilmCardElementClick(event) {
    event.preventDefault();
    this._onViewChange();
    this._filmDetailComponent = new FilmDetail(this._film);
    render(this._container, this._filmDetailComponent);
    this._setFilmDetailComponentClickHandlers(this._film);

    document.addEventListener(`keydown`, this._onFilmDetailEscPress);
    this._filmDetailComponent.setCloseButtonClickHandler(this._closeFilmDetail);
  }

  setDefaultView() {
    this._closeFilmDetail();
  }

}
