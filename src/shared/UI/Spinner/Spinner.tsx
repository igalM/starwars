import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)'
        }
    }),
);



const Spinner: React.FC = () => {
    const classes = useStyles();
    return <div className={classes.root}><CircularProgress size={50}/></div>
};

export default Spinner;
