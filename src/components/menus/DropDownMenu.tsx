import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { MouseEventHandler, useContext } from "react";
import AuthContext from "../contexts/auth/AuthContext";
import { Link as RouterLink, useHistory } from 'react-router-dom';


// Return a dropdown AccountMenu
const DropDownMenu = (props: { anchorEl: Element, menuId: string, onClose: MouseEventHandler }) => {
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
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        id={props.menuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        open={isMenuOpen}
        onClose={props.onClose}
        >
         {props.children}   
        </Menu>
  )};

export default DropDownMenu;