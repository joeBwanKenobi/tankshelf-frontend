import { useEffect } from 'react';
import axios from 'axios';
import Plant from '../constants/plant.interface';
import Fish from '../constants/fish.interface';

// Returns a user object from api or null if response is 401
export const getUser = async (): Promise<any> => {
    console.log(`calling ${process.env.REACT_APP_API_AUTH_URL}/user`);
    const user = axios.get(`${process.env.REACT_APP_API_AUTH_URL}/user`, {
        withCredentials: true
    })
        .then(res => {
            console.log(res)
            return res.data;
        }).catch(e => {
            if (e.response) {
                if (e.response.status === 401) {
                    return undefined;
                }
            }
            else {
                return 'API Server not available'
            }
        });

    return user;
}

export const loggedIn = async (): Promise<boolean> => {
    console.log(`calling loggedIn ${process.env.REACT_APP_API_AUTH_URL}/loggedin`);
    const loggedIn = await axios.get(`${process.env.REACT_APP_API_AUTH_URL}/loggedin`, {
        withCredentials: true
    });
    return loggedIn.data.loggedin;
}

export const logOut = async (): Promise<any> => {
    console.log(`calling ${process.env.REACT_APP_API_AUTH_URL}/logout`);
    const loggedOut = await axios.get(`${process.env.REACT_APP_API_AUTH_URL}/logout`, {
        withCredentials: true
    });
    return loggedOut;
}

export const addTank = async (tankDetails: FormData): Promise<any> => {
    console.log(`calling POST ${process.env.REACT_APP_API_TANKS_URL}/addTank`);
    const newTank = await axios.post(`${process.env.REACT_APP_API_TANKS_URL}/addTank`, tankDetails, {
        withCredentials: true,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });

    return newTank.data;
}

export const getPlants = async(): Promise<Plant[]> => {
    console.log(`calling GET ${process.env.REACT_APP_API_BASE_URL}/api/plants/freshwater`)
    const plants = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/plants/freshwater`)

    return plants.data;
}

export const getFish = async(): Promise<Fish[]> => {
    console.log(`calling GET ${process.env.REACT_APP_API_BASE_URL}/api/fish/freshwater`)
    const fish = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/fish/freshwater`)

    return fish.data;
}

const MS_IN_A_DAY = 1000 * 60 * 60 * 24

export const ageInDays = (firstDate: number) => {
    // The start date or created date to calculate against today
    const start = firstDate;
    const today = Date.now();
    const differenceInMs = Math.abs(today - start);
    const differenceInDays = Math.ceil(differenceInMs / MS_IN_A_DAY);

    return differenceInDays;
}

export const formatDate = (age: number) => {
    let date = new Date(age).toISOString().slice(0, 10);
    return date;
}

export const uploadImages = async (formData: FormData, id: string) => {
    console.log(`calling ${process.env.REACT_APP_API_BASE_URL}api/media/upload with `)
    const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}api/media/upload`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then(res => { console.log(res); })
}