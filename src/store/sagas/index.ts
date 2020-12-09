import MoviesSagas from './movies';
import { all } from 'redux-saga/effects';

export default function* rootSaga() {
    yield all([
        ...MoviesSagas
    ])
}