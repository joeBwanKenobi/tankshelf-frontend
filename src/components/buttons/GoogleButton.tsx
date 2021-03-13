import React from 'react';
import Button from '@material-ui/core/Button';
import { createStyles, makeStyles, Icon, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(1, 'auto'),
      justifyContent: 'center',
      textTransform: 'none',
      width: "100%"
    },
    imageContainer: {
        marginRight: theme.spacing(1)
    },
    imageIcon: {
        height: '100%',
    }
  }),
);




export default function GoogleButton ({text, type}: {text: string, type: "login" | "register"}) {
    const classes = useStyles();
    const API_URL = `${process.env.REACT_APP_API_AUTH_URL}/${(type === "login") ? "login" : "google" }`;

    // const googleAuth = () => {

    //     fetch(API_URL).then(res => console.log(res)).catch(e => console.error(e));
    // }
    
    return (
        <Button
            variant="contained"
            color="primary"
            size="large"
            className={classes.button}
            href={API_URL}
            // onClick={googleAuth}
        >
            <Icon className={classes.imageContainer}>
                <img className={classes.imageIcon} src="../../assets/btn_google_dark_normal_ios.svg" />
            </Icon>
        
            {text}
        </Button>
    )
}