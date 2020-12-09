import { IFavoriteMoviesIdsSet, IMovieSet } from '../../types';
import { typedAction } from '../../utils/util';
import * as actionTypes from './actionTypes';

export const toggleFav = (id: string, favoritesIds: IFavoriteMoviesIdsSet) => {
    return typedAction(actionTypes.TOGGLE_FAV_MOVIE, {id, favoritesIds});
};

export const toggleFavStart = (id: string) => {
    return typedAction(actionTypes.TOGGLE_FAV_MOVIE_START, id);
};

export const fetchMoviesStart = () => {
    return typedAction(actionTypes.FETCH_MOVIES_START);
};

export const fetchMoviesSuccess = (movies: IMovieSet, favoritesIds: IFavoriteMoviesIdsSet) => {
    return typedAction(actionTypes.FETCH_MOVIES_SUCCESS, { movies, favoritesIds });
};

export const fetchMoviesFailed = (error: string) => {
    return typedAction(actionTypes.FETCH_MOVIES_FAILED, error);
};

export const fetchMovies = () => {
    return typedAction(actionTypes.FETCH_MOVIES);
};

export type MoviesActions = ReturnType<
    typeof toggleFav |
    typeof fetchMoviesStart |
    typeof fetchMoviesSuccess |
    typeof fetchMoviesFailed |
    typeof fetchMovies>;