import React, { useEffect } from 'react';
import axios from 'axios';

export const ProfileView = () => {
    let token = localStorage.getItem('JWT');
    console.log(token);

    const getUser = () => {
        // fetch(`${process.env.REACT_APP_API_USER_URL}/profile`, {
        //     // credentials: 'include'
        //     headers: {
        //         'Authorization': `Bearer ${token}`
        //     }
        // }).then((res: Response) => {
        //     console.log(res);
        // })
        console.log(`calling ${process.env.REACT_APP_API_AUTH_URL}/user`)
        axios.get(`${process.env.REACT_APP_API_AUTH_URL}/user`, {
            withCredentials: true
        }).then(res => {
            console.log(res.data);
        }).catch(e => console.error(e));
    }

    useEffect(() => {
        getUser();
    }, [])

    return(
        <div>Profile</div>
    )
}