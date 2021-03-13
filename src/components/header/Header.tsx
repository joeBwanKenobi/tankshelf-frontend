import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Link from '@material-ui/core/Link';
import { Icon } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    loginButton: {
      textTransform: 'none'
    },
    title: {
      flexGrow: 1,
    },
    imageContainer: {
      marginRight: theme.spacing(1)
    },
    imageIcon: {
        height: '100%',
    },
    linkContainer: {
      marginRight: theme.spacing(3)
    },
    links: {
      margin: theme.spacing(1, 1.5)
    }
  }),
);

export default function Header() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton> */}
          <Icon className={classes.imageContainer}>
                <img className={classes.imageIcon} src="../../assets/aquarium_light.svg" />
          </Icon>
          <Typography variant="h6" className={classes.title}>
            TankShelf
          </Typography>
          <div className={classes.linkContainer}>
            <Link href="/tanks" color="textPrimary" className={classes.links}>
              Browse Tanks
            </Link>
            <Link href="/signup" color="textPrimary" className={classes.links}>
              Sign Up
            </Link>
            <Link href="/user/profile" color="textPrimary" className={classes.links}>
              Profile
            </Link>
          </div>
          <Button color="inherit" href="/login" className={classes.loginButton}>Login</Button>
          <Button color="inherit" href={`${process.env.REACT_APP_API_AUTH_URL}/logout`} className={classes.loginButton}>Logout</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}