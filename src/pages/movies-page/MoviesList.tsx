import React, { useCallback, useState } from 'react';
import MovieItem from './components/MovieItem/MovieItem';
import { useSelector } from 'react-redux';
import { selectErrorState, selectLoadingState, selectMoviesState } from '../../store/reducers/selectors';
import Spinner from '../../shared/UI/Spinner/Spinner';
import { useDispatch } from 'react-redux';
import * as MoviesActions from '../../store/actions/movies';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            display: 'flex',
            flexWrap: 'wrap',
            padding: 20,
            [theme.breakpoints.down('xs')]: {
                padding: 15
            }
        }
    }),
);

const MoviesList = () => {
    const [movieToExpand, setMovieToExpand] = useState<number | null>(null);
    const movies = useSelector(selectMoviesState);
    const loading = useSelector(selectLoadingState);
    const error = useSelector(selectErrorState);

    const classes = useStyles();

    const dispatch = useDispatch();

    const handleToggleFav = useCallback((id: number) => dispatch(MoviesActions.toggleFavStart(id.toString())), [dispatch]);
    const handleExpandClick = (id: number) => {
        if (id === movieToExpand) setMovieToExpand(null);
        else setMovieToExpand(id);
    };

    if (loading) return <Spinner />;
    if (error) return <h2>Some error occured, please contact the site creator!</h2>;

    const moviesList = Object.keys(movies)
        .map((key: string) =>
            <MovieItem
                key={key}
                toggle={(id: number) => handleToggleFav(id)}
                expand={(id: number) => handleExpandClick(id)}
                expanded={movieToExpand?.toString() === key ? true : false}
                {...movies[key]} />);
    return (
        <Grid container className={classes.root}>
            {moviesList}
        </Grid>
    );
}

export default MoviesList;