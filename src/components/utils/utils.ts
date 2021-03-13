import { useEffect } from 'react';
import axios from 'axios';

// export const getUser = async(): Promise<any> => {
//     console.log(`calling ${process.env.REACT_APP_API_AUTH_URL}/user`)
//     const response = await fetch(`${process.env.REACT_APP_API_AUTH_URL}/user`, {
//         credentials: 'include'
//     });
//     console.log(response.data)
//     return response;
// }

// Axios works
export const getUser = async(): Promise<any> => {
    console.log(`calling ${process.env.REACT_APP_API_AUTH_URL}/user`);
    const user = await axios.get(`${process.env.REACT_APP_API_AUTH_URL}/user`, {
        withCredentials: true
    });
    return user.data;
}
