import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import React, { MouseEventHandler, useContext } from "react";
import AuthContext from "../contexts/auth/AuthContext";
import { Link as RouterLink, useHistory } from 'react-router-dom';
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import DropDownMenu from "../menus/DropDownMenu";
import AccountCircle from "@material-ui/icons/AccountCircle";


// Return a dropdown AccountMenu
const AccountMenu = () => {
  const { logout } = useContext(AuthContext);

  // use Router history for redirecting at logout
  let history = useHistory();

  // call logout from Authcontext then forward user to home
  const handleLogout = () => {
    logout();
    history.push("/");
  }

  const menuItems = [
    { label: 'Profile', url: '/user/profile' },
    { label: 'Logout', action: handleLogout },
  ];

  return (
    <React.Fragment>
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
    </React.Fragment>
  )
};

export default AccountMenu;