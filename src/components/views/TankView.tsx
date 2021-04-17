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
    const [plants, setPlants] = useState<any[]>([]);
    const [fish, setFish] = useState<any[]>([]);
    
    useEffect(() => {
        getTank();
    }, []);

    const getTank = async() => {
        fetch(API_URL)
        .then(res => res.json())
        .then(res => {
            console.log('setting tank data')
            setTankData(res);
        }).then(() => {
            getImages();
            getContents();
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
            console.log('getImages(): ')
            console.log(res);
            setTankImages([...res]);
        }).catch(e => {
            console.log('error!!:')
            console.error(e)
        });
    }

    const getContents = async() => {
        // get plants related to this tank
        fetch(`${process.env.REACT_APP_API_BASE_URL}/api/plants/tank/${id}`)
        .then(res => res.json())
        .then(res => {
            console.log('getContents() :: plants ::');
            console.log(res);
            setPlants([...res]);
        }).catch(e => console.error(e));
        
        // get fish related to this tank
        fetch(`${process.env.REACT_APP_API_BASE_URL}/api/fish/tank/${id}`)
        .then(res => res.json())
        .then(res => {
            console.log('getContents() :: fish ::');
            console.log(res);
            setPlants([...res]);
        }).catch(e => console.error(e));
    }
    
    const classes = useStyles();

    const props = {
        ...tankData,
        images: tankImages,
        plants: plants,
        fish: fish
    }
    return(
        <main className={classes.mainContent}>
            <TankDisplay {...props as any} />
        </main>
    )
}