import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import MoviesList from './pages/movies-page/MoviesList';
import CustomToolbar from './shared/UI/Toolbar/Toolbar';
import * as MoviesActions from './store/actions/movies';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(MoviesActions.fetchMovies());
  }, [dispatch]);

  return (
    <>
      <CustomToolbar />
      <MoviesList />
    </>
  );
}

export default App;
