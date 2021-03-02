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
    const API_URL = `http://localhost:7000/api/tanks/`
    // create state variable and function to update it
    const [tanksList, setTanksList] = useState([]);
    
    useEffect(() => {
        console.log(`effect`);
        getList();
    }, []);

    const getList = async() => {
        const response = await fetch(API_URL);
        const data = await response.json();
        setTanksList(data);
        console.log(data);
    } 
    // Creates Grid item for each tank object in list
    const getTank = (tankObject: Tank) => {
        return(
            <Grid item xs={12} sm={4} >
                <TankCard key={tankObject.id} {...tankObject} />
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