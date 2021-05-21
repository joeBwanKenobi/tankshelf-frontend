import React, { useEffect, useState } from 'react';
import TankDisplayEditor from '../tank/TankDisplayEditor';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';
import Plant from '../../constants/plant.interface';
import Fish from '../../constants/fish.interface';
import * as Utils from '../../utils/utils';


const useStyles = makeStyles((theme) => ({
    mainContent: {
        marginTop: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }
}));

export const TankEditorView = () => {
    const { tankId } = useParams<{ tankId: string }>();
    const id = tankId;
    // api settings
    const API_URL = `http://localhost:7000/api/tanks/${id}`
    const IMAGES_API_URL = `${process.env.REACT_APP_IMAGE_API_URL}/${id}`
    // create state variable and function to update it
    const [tankData, setTankData] = useState({});
    const [tankImages, setTankImages] = useState<any[]>([]);
    const [plants, setPlants] = useState<Plant[]>();
    const [fish, setFish] = useState<Fish[]>();
    // Populate possible plants and inhabitants
    const [plantsList, setPlantsList] = useState<Plant[] | []>();
    const [fishList, setFishList] = useState<Fish[]>();
    
    useEffect(() => {
        getTank();
        // Call DB for list of freshwater plants
        Utils.getPlants().then(res => {
            setPlantsList(res);
            console.log("plantsList set")
        });
        // Call DB for list of freshwater fish
        Utils.getFish().then(res => {
            setFishList(res);
            console.log("fishList set")
        });
    }, []);

    const getTank = async() => {
        fetch(API_URL)
        .then(res => res.json())
        .then(res => {
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
            setTankImages([...res]);
        }).catch(e => {
            console.error(e)
        });
    }

    const getContents = async() => {
        // get plants related to this tank
        fetch(`${process.env.REACT_APP_API_BASE_URL}/api/plants/tank/${id}`)
        .then(res => res.json())
        .then(res => {
            setPlants([...res]);
        }).catch(e => console.error(e));
        
        // get fish related to this tank
        fetch(`${process.env.REACT_APP_API_BASE_URL}/api/fish/tank/${id}`)
        .then(res => res.json())
        .then(res => {
            setFish([...res]);
        }).catch(e => console.error(e));
    }
    
    const classes = useStyles();

    const props = {
        ...tankData,
        images: tankImages,
        plants: plants,
        fish: fish,
        plantsList: plantsList,
        fishList: fishList
    }

    return(
        <main className={classes.mainContent}>
            <TankDisplayEditor {...props as any} />
        </main>
    )
}