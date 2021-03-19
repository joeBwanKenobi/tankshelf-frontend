import React, { ReactNode, useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import Header from '../components/header/Header';
import { createMuiTheme } from '@material-ui/core';
import AuthContext from '../components/contexts/auth/AuthContext';
import HeaderLoggedIn from '../components/header/HeaderLoggedIn';

export const Layout = ({ children }: { children: ReactNode }) => {
        const authContext = useContext(AuthContext);
        let header;
        console.log(authContext.isLoggedIn);
        if(authContext.isLoggedIn) {
            console.log(`user isLoggedIn setting logged in header`)
            header = <HeaderLoggedIn />;
        } else {
            console.log(`user !isLoggedIn setting regular header`)
            header = <Header />;
        }
    return (
        <Grid container direction="column">
            <Grid item>
                {header}
            </Grid>

            <Grid item container>
                <Grid item xs={false} sm={2}></Grid>
                <Grid item xs={12} sm={8}>
                    {children}
                </Grid>
                <Grid item xs={false} sm={2}></Grid>
            </Grid>
        </Grid>
    )
}
