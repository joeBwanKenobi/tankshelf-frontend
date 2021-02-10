import React from 'react';
import TankCard from '../tank/TankCard';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { tanksList } from '../../constants/tankConstants';
import { Grid } from '@material-ui/core';
import { Tank } from '../../constants/tank.interface';


const useStyles = makeStyles((theme) => ({
    mainContent: {
        padding: theme.spacing(8, 0 , 6)
    },
    heading: {
        padding: theme.spacing(0, 0, 4, 0)
    }
}));

export const Tanks = ({title}: {title: String}) => {
    const getTank = (tankObject: Tank) => {
        return(
            <Grid item xs={12} sm={4} >
                <TankCard {...tankObject} />
            </Grid>
        )
    }
    const classes = useStyles();
    return(
        <main className={classes.mainContent}>
            <Typography className={classes.heading} variant="h1">
                {title}
            </Typography>
            <Grid container spacing={2}>
                {tanksList.map((tankObject: Tank) => getTank(tankObject))}
            </Grid>
        </main>
    )
}