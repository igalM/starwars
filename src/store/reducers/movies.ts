import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utils/util';
import { IFavoriteMoviesIdsSet, IMovieSet } from '../../types';
import { MoviesActions } from '../actions/movies';

interface MoviesState {
    movies: IMovieSet,
    favoritesIds: IFavoriteMoviesIdsSet,
    error: boolean,
    loading: boolean
}

const initialState: MoviesState = {
    movies: {},
    favoritesIds: {},
    error: false,
    loading: false
}

const moviesReducer = (state = initialState, action: MoviesActions): MoviesState => {
    switch (action.type) {
        case actionTypes.TOGGLE_FAV_MOVIE:
            return toggleFavMovieHelper(state, action.payload);
        case actionTypes.FETCH_MOVIES_START:
            return fetchMoviesStartHelper(state);
        case actionTypes.FETCH_MOVIES_FAILED:
            return fetchMoviesFailedHelper(state);
        case actionTypes.FETCH_MOVIES_SUCCESS:
            return fetchMoviesSuccessHelper(state, action.payload);
        default:
            return state;
    }
}

const fetchMoviesSuccessHelper = (state: MoviesState, payload: { movies: IMovieSet, favoritesIds: IFavoriteMoviesIdsSet }): MoviesState => {
    const movies = { ...payload.movies };
    const favoritesIds = { ...payload.favoritesIds };
    for (const key in movies) {
        if (key in favoritesIds) {
            movies[key].isFavorite = true;
        }
    }
    const updatedState = {
        movies: movies,
        favoritesIds: favoritesIds,
        loading: false,
        error: false
    };
    return updateObject(state, updatedState);
}

const fetchMoviesStartHelper = (state: MoviesState): MoviesState => {
    const updatedState = {
        loading: true
    };
    return updateObject(state, updatedState);
}

const fetchMoviesFailedHelper = (state: MoviesState): MoviesState => {
    const updatedState = {
        loading: false,
        error: true
    };
    return updateObject(state, updatedState);
}

const toggleFavMovieHelper = (state: MoviesState, payload: { id: string, favoritesIds: IFavoriteMoviesIdsSet }): MoviesState => {
    const updatedMovie = { ...state.movies[payload.id] };
    updatedMovie.isFavorite = !updatedMovie.isFavorite;
    const updatedMovies = updateObject(state.movies, {
        [payload.id]: updatedMovie
    });
    const updatedState = {
        movies: updatedMovies,
        favoritesIds: payload.favoritesIds
    };
    return updateObject(state, updatedState);
}

export default moviesReducer;