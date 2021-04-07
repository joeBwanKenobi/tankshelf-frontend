import React, { useEffect, useState } from 'react';
import TankDisplay from '../tank/TankDisplay';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Tank } from '../../constants/tank.interface';
import { useParams } from 'react-router-dom';
import axios from 'axios';


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
    const id = tankId;
    // api settings
    const API_URL = `http://localhost:7000/api/tanks/${id}`
    const IMAGES_API_URL = `http://localhost:7000/api/media/${id}`
    // create state variable and function to update it
    const [tankData, setTankData] = useState({});
    const [tankImages, setTankImages] = useState<any[]>([]);
    
    useEffect(() => {
        getTank();
    }, []);

    const getTank = async() => {
        fetch(API_URL)
        .then(res => res.json())
        .then(res => {
            setTankData(res);
        }).then(() => {
            getImages();
        })
        .catch(e => console.error(e));
    }

    const getImages = async() => {
        fetch(IMAGES_API_URL, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(res => {
            setTankImages(res);
        }).catch(e => console.error(e));
    }
    
    const classes = useStyles();

    const props = {
        ...tankData,
        images: tankImages,
    }
    return(
        <main className={classes.mainContent}>
            {/* {listData({...tankData as Tank})} */}
            <TankDisplay {...props as Tank} />
        </main>
    )
}