import React, { ReactNode, useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import { createMuiTheme } from '@material-ui/core';
import Header from '../components/header/Header';

export const Layout = ({ children }: { children: ReactNode }) => {

    return (
        <Grid container direction="column">
            <Grid item>
                <Header />
            </Grid>

            <Grid item container>
                <Grid item xs={false} sm={1}></Grid>
                <Grid item xs={12} sm={10}>
                    {children}
                </Grid>
                <Grid item xs={false} sm={1}></Grid>
            </Grid>
        </Grid>
    )
}
