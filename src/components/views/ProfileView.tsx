import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import UserProvider from '../contexts/user/UserProvider';
import AccountInfo from '../users/AccountInfo';

export const ProfileView = () => {
    const userData = useContext(UserProvider.context);
    console.log(userData);
    // const [isLoggedIn, setLoggedIn] = useState(false);

    // useEffect(() => {
    //     setLoggedIn(userData != null);
    //     console.log((userData != null), (userData === null))
    //     console.log(isLoggedIn);
    // }, [])

    return(
        <div>
            <h1>Profile</h1>
            {userData != null ?
            <AccountInfo props={userData} /> :
            <div>
                <p>You are not logged into an account.</p>
            </div>
            }
        </div>
    )
}