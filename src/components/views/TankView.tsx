import React, { useEffect, useState } from 'react';
import TankDisplay from '../tank/TankDisplay';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
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
    const { tankId } = useParams<{ tankId: string }>();
    const id = parseInt(tankId, 10);
    // api settings
    const API_URL = `http://localhost:7000/api/tanks/${id}`
    // create state variable and function to update it
    const [tankData, setTankData] = useState<Tank>();
    
    useEffect(() => {
        getList();
    }, []);

    const getList = async() => {
        const response = await fetch(API_URL);
        const data = await response.json();
        setTankData(data);
    }

    function listData(obj: Tank) {
        Object.entries(obj).forEach(entry => console.log(entry));
    }
    
    const classes = useStyles();
    return(
        <main className={classes.mainContent}>
            {/* {listData({...tankData as Tank})} */}
            <TankDisplay {...tankData as Tank} />
        </main>
    )
}