import { RootState } from './index';

export const selectMoviesState = (state: RootState) => state.moviesReducer.movies;
export const selectLoadingState = (state: RootState) => state.moviesReducer.loading;
export const selectErrorState = (state: RootState) => state.moviesReducer.error;

