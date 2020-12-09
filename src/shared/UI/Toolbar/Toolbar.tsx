import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Logo from '../../../assets/images/logo.svg';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            textAlign: 'center',
            paddingBottom: 100,
            [theme.breakpoints.down('xs')]: {
                paddingBottom: 80
            }
        },
        toolbar: {
            height: 80,
        },
        logo: {
            position: 'absolute',
            maxWidth: 100,
            [theme.breakpoints.down('xs')]: {
                maxWidth: 65
            }
        },
        title: {
            margin: 'auto',
            [theme.breakpoints.down('xs')]: {
                fontSize: 18
            }
        }
    }),
);

const CustomToolbar = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="fixed">
                <Toolbar className={classes.toolbar}>
                    <img className={classes.logo} src={Logo} alt="Star Wars Logo" />
                    <h1 className={classes.title}>The Star Wars Trilogy</h1>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default CustomToolbar;