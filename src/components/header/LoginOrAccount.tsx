import Badge from "@material-ui/core/Badge";
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, Theme } from "@material-ui/core/styles";
import createStyles from "@material-ui/styles/createStyles";
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { MouseEventHandler } from "react";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Button from "@material-ui/core/Button";
import AccountMenu from './AccountMenu';
import DropDownMenu from "../menus/DropDownMenu";



const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    loginButton: {
      textTransform: 'none'
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    }
  })
);

// If AuthContext isLoggedIn return an Account Menu, otherwise return a Login button
const LoginOrAccount = (props: { isLoggedIn: boolean, menuId: string, onClick: MouseEventHandler }) => {
  const classes = useStyles();

  const handleLogout = () => {
    console.log('logout');
  }
  
  const menuItems = [
    { label: 'Profile', url: '/user/profile' },
    { label: 'Logout', url: 'logout' },
    
  ];

  return (
    props.isLoggedIn ?
      <div className={classes.sectionDesktop}>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <IconButton aria-label="show 17 new notifications" color="inherit">
          <Badge badgeContent={17} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <DropDownMenu data={menuItems} buttonContent={<AccountCircle />} icon={true} />
        
      </div>
      :
      <Button color="inherit" href="/login" className={classes.loginButton}>Login</Button>
  )
};

export default LoginOrAccount;