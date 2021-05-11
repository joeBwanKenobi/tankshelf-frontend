
import { useHistory } from 'react-router-dom';
import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    paper: {
      marginRight: theme.spacing(2),
    },
  }),
);

// DropDownMenu takes an array of objects defining items and their target url, returns a dropdown menu list
export default function DropDownMenu(props: { data: { label: string, url: string }[], buttonContent: React.ReactElement<any>, icon?: boolean }) {
  const classes = useStyles();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (e: React.BaseSyntheticEvent) => {
    console.log('click');
    console.log(e.currentTarget);
    setAnchorEl(e.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  const menuItem = (item: any) => {
    return (
      <MenuItem key={item.label} onClick={() => history.push(item.url)}>{item.label}</MenuItem>
    )
  }

  return (
    <div className={classes.root}>
      {props.icon === true ?
        <IconButton
          edge="end"
          aria-haspopup="true"
          onClick={handleClick}
          color="inherit"
        >
          {props.buttonContent}
        </IconButton>
        :
        <Button
          id="basic-button"
          // aria-contorls="drop-down-menu" // React complaining about incorrect aria-controls option
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          {props.buttonContent}
        </Button>
      }

      <Menu
        id="drop-down-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {props.data.map(item => menuItem(item))}

      </Menu>
    </div>
  );
}