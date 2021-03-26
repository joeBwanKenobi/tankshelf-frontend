import { useEffect } from 'react';
import axios from 'axios';

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
