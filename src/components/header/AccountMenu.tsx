import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { MouseEventHandler, useContext } from "react";
import AuthContext from "../contexts/auth/AuthContext";
import { Link as RouterLink, useHistory } from 'react-router-dom';


// Return a dropdown AccountMenu
const AccountMenu = (props: { anchorEl: Element, menuId: string, onClose: MouseEventHandler }) => {
    const { logout } = useContext(AuthContext);
    const isMenuOpen = Boolean(props.anchorEl);
    // use Router history for redirecting at logout
    let history = useHistory();

    // call logout from Authcontext then forward user to home
  const handleLogout = () => {
    logout();
    history.push("/");
  }

    return (
        <Menu
        anchorEl={props.anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={props.menuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={props.onClose}
        >
            <MenuItem component={RouterLink} to="/user/profile">Profile</MenuItem>
            <MenuItem onClick={handleLogout} >Logout</MenuItem>
            {/* <MenuItem onClick={handleMenuClose}>My account</MenuItem> */}
        </Menu>
  )};

export default AccountMenu;