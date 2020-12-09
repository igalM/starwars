import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import moment from 'moment';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';
import Collapse from '@material-ui/core/Collapse';
import { IMovie } from '../../../../types';

const favoriteBoxShadow = '0px 0px 3px 1px #f44336';
const normalBoxShadow = '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 8px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)';

type StyleProps = {
    isFavorite: boolean,
    expanded: boolean
};

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) =>
    createStyles({
        root: props => ({
            position: 'relative',
            margin: 20,
            flexDirection: 'column',
            boxShadow: props.isFavorite ? favoriteBoxShadow : normalBoxShadow,
            transition: '0.2s all',
            height: props.expanded ? 450 : 320,
            '&:hover': {
                transform: "scale(1.03)"
            },
            [theme.breakpoints.down('sm')]: {
                height: 'auto',
                minHeight: 280
            },
            [theme.breakpoints.down('xs')]: {
                margin: 10,
                minHeight: 320
            }
        }),
        openingCrawl: {
            padding: '0 16px'
        },
        expand: {
            transform: 'rotate(0deg)',
            marginLeft: 'auto',
            transition: theme.transitions.create('transform', {
                duration: theme.transitions.duration.shortest,
            }),
        },
        expandOpen: {
            transform: 'rotate(180deg)',
        },
        actions: {
            position: 'absolute',
            right: 0,
            bottom: 0
        },
        icon: {
            marginLeft: 'auto'
        }
    }),
);

type Props = {
    expanded: boolean;
    expand: (id: number) => void;
    toggle: (id: number) => {};
} & IMovie;

const MovieItem: React.FC<Props> = ({
    title,
    episode_id,
    opening_crawl,
    release_date,
    isFavorite,
    expanded,
    characters,
    planets,
    vehicles,
    species,
    starships,
    expand,
    toggle }) => {

    const classes = useStyles({ isFavorite, expanded });

    return (
        <Grid item lg={4} md={6}>
            <Card className={classes.root}>
                <CardHeader
                    title={title}
                    subheader={moment(release_date).format('LL')}
                />
                <CardContent className={classes.openingCrawl}>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {opening_crawl}
                    </Typography>
                </CardContent>
                <CardActions className={classes.actions}>
                    <Tooltip title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}>
                        <IconButton onClick={() => toggle(episode_id)} className={classes.icon}>
                            <FavoriteIcon color={isFavorite ? 'secondary' : 'disabled'} />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title={expanded ? 'Show less' : 'Show more'}>
                        <IconButton
                            className={clsx(classes.expand, {
                                [classes.expandOpen]: expanded,
                            })}
                            onClick={() => expand(episode_id)}
                            aria-expanded={expanded}>
                            <ExpandMoreIcon />
                        </IconButton>
                    </Tooltip>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography paragraph><u>Extras</u></Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Number of characters: {characters.length}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Number of planets: {planets.length}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Number of species: {species.length}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Number of vehicles: {vehicles.length}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Number of starships: {starships.length}
                        </Typography>
                    </CardContent>
                </Collapse>
            </Card>
        </Grid>
    );
}

export default MovieItem;
