import React from 'react';
import TankDisplay from '../tank/TankDisplay';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {tanksList} from '../../constants/tankConstants';
import { Tank } from '../../constants/tank.interface';
import { useParams } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    mainContent: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }
}));

export const TankView = () => {
    const { tank } = useParams<{ tank: string }>();
    const target = tanksList.find(obj => obj.id == parseInt(tank)) as Tank;
    const classes = useStyles();
    return(
        <main className={classes.mainContent}>
            <TankDisplay {...target} />
        </main>
    )
}