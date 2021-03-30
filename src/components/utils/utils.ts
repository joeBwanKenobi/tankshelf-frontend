import { useEffect } from 'react';
import axios from 'axios';
import { NewTank } from '../views/createTank/CreateTankView';

// Returns a user object from api or null if response is 401
export const getUser = async(): Promise<any> => {
    console.log(`calling ${process.env.REACT_APP_API_AUTH_URL}/user`);
    const user = axios.get(`${process.env.REACT_APP_API_AUTH_URL}/user`, {
        withCredentials: true
    })
    .then(res => {
        console.log(res)
        return res.data;
    }).catch(e => {
        if (e.response.status === 401) {
            return undefined;
        }
    });

    return user;
}

export const loggedIn = async(): Promise<boolean> => {
    console.log(`calling loggedIn ${process.env.REACT_APP_API_AUTH_URL}/loggedin`);
    const loggedIn = await axios.get(`${process.env.REACT_APP_API_AUTH_URL}/loggedin`, {
        withCredentials: true
    });
    return loggedIn.data.loggedin;
}

export const logOut = async(): Promise<any> => {
    console.log(`calling ${process.env.REACT_APP_API_AUTH_URL}/logout`);
    const loggedOut = await axios.get(`${process.env.REACT_APP_API_AUTH_URL}/logout`, {
        withCredentials: true
    });
    return loggedOut;
}

export const addTank = async(tankDetails: NewTank): Promise<any> => {
    console.log(`calling POST ${process.env.REACT_APP_API_TANKS_URL}/addTank`);
    const newTank = await axios.post(`${process.env.REACT_APP_API_TANKS_URL}/addTank`, {
        data: tankDetails
    }).then(res => {console.log(res)});
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
