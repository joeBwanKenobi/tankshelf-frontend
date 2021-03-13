import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import UserProvider from '../contexts/user/UserProvider';

export const ProfileView = () => {
    const userData = useContext(UserProvider.context);
    console.log(userData);

    return(
        <div>
            <h1>Profile</h1>
            { userData != null &&
                <div>
                <p>{userData.display_name}</p>
                <p>{userData.email}</p>
                </div>
            }
            
        </div>
    )
}