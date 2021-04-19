import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import UserProvider from '../contexts/user/UserProvider';
import AccountInfo from '../users/AccountInfo';
import AuthContext from '../contexts/auth/AuthContext';

export const ProfileView = () => {
    const authContext = useContext(AuthContext);
    const userData = useContext(UserProvider.context);
    


    return(
        <div>
            <h1>Profile</h1>
            {authContext.isLoggedIn &&
                <h2>You are logged in!</h2>
            }
        <br></br><br></br>
            {userData != null ?
            <AccountInfo props={userData} /> :
            <div>
                <p>You are not logged into an account.</p>
            </div>
            }
        </div>
    )
}