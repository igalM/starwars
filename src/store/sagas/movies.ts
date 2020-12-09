import { put, takeEvery, call, delay } from 'redux-saga/effects';
import * as MoviesActions from '../actions/movies';
import * as actionTypes from '../actions/actionTypes';
import { moviesApi } from '../../api/movies';
import { IFavoriteMoviesIdsSet } from '../../types';


function* updateFavMoviesIdsSaga(action: ReturnType<typeof MoviesActions.toggleFavStart>) {
    const ids = yield call([localStorage, 'getItem'], 'favoriteMoviesIds');
    let updatedIds: IFavoriteMoviesIdsSet = { ...JSON.parse(ids) };
    if (updatedIds[action.payload]) {
        delete updatedIds[action.payload];
    } else {
        updatedIds[action.payload] = action.payload;
    }
    yield call([localStorage, 'setItem'], 'favoriteMoviesIds', JSON.stringify(updatedIds));
    yield put(MoviesActions.toggleFav(action.payload, updatedIds));
}

function* getMoviesSaga() {
    try {
        yield put(MoviesActions.fetchMoviesStart());
        yield delay(500);
        const movies = yield call(() => moviesApi.getMovies());
        const ids = yield call([localStorage, 'getItem'], 'favoriteMoviesIds');
        yield put(MoviesActions.fetchMoviesSuccess(movies, JSON.parse(ids)));
    } catch (err) {
        yield put(MoviesActions.fetchMoviesFailed(err));
    }
}

const sagas = [
    takeEvery(actionTypes.FETCH_MOVIES, getMoviesSaga),
    takeEvery(actionTypes.TOGGLE_FAV_MOVIE_START, updateFavMoviesIdsSaga)
];

export default sagas;
