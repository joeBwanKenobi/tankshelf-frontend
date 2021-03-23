import { useState, MouseEvent } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import makeStyles from '@material-ui/styles/makeStyles';
import createStyles from '@material-ui/styles/createStyles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        loginButton: {
            textTransform: 'none'
        }
    })
);

export default function TanksMenu() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const classes = useStyles();
    const history = useHistory();

      const handleMouseEnter = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
      };

      const handleClose = () => {
        setAnchorEl(null);
      };

    return (
        <div>
            <Button 
            aria-controls="simple-menu" 
            aria-haspopup="true" 
            onMouseOver={handleMouseEnter}
            className={classes.loginButton}
            >
                Tanks
      </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                // onMouseLeave={handleClose}
                getContentAnchorEl={null}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                MenuListProps={{ onMouseLeave: handleClose }}
            >
                <MenuItem onClick={() => history.push("/")}>Browse Tanks</MenuItem>
                <MenuItem onClick={() => console.log('favorites')}>Favorites</MenuItem>
                <MenuItem onClick={() => history.push("/tanks/create")}>Create Tank</MenuItem>
            </Menu>
        </div>
    );
}
