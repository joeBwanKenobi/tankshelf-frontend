import React, { ReactNode } from 'react';
import Grid from '@material-ui/core/Grid';
import Header from '../components/header/Header';
import { createMuiTheme } from '@material-ui/core';

export const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <Grid container direction="column">
            <Grid item>
                <Header />
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
