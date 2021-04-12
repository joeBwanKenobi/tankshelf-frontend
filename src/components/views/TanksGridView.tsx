import React, { useState, useEffect } from 'react';
import TankCard from '../tank/TankCard';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
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

export const TanksGrid = ({title}: {title: String}) => {
    // api settings
    const API_URL = `${process.env.REACT_APP_API_TANKS_URL}`
    // create state variable and function to update it
    const [tanksList, setTanksList] = useState([]);
    
    useEffect(() => {
        getList();
    }, []);

    const getList = async() => {
        const response = await fetch(API_URL);
        const data = await response.json();
        console.log(data)
        setTanksList(data);
    } 
    // Creates Grid item for each tank object in list
    const getTank = (tankObject: Tank) => {
        return(
            <Grid item xs={12} sm={4} key={tankObject.tankID} >
                <TankCard {...tankObject} />
            </Grid>
        )
    }
    const classes = useStyles();
    return(
        <main className={classes.mainContent}>
            <Typography className={classes.heading} variant="h2">
                {title}
            </Typography>
            <Grid container spacing={2}>
                {tanksList.map((tankObject: Tank) => getTank(tankObject))}
            </Grid>
        </main>
    )
}