import { SyntheticEvent } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    removeButton: {
      background: '#b2102f',
      position: 'relative',
      bottom: '95%',
      left: '14px',
      '&:hover': {
        background: '#ff1744'
      },
      zIndex: 1,
    }
  }),
);

export const RemoveButton = () => {
    const classes = useStyles();

    const click = (e: React.SyntheticEvent) => {
        console.log(e.currentTarget);
    }

    return ( 
            <IconButton size="small" className={classes.removeButton} onClick={click}>
              <CloseIcon fontSize="small" />
            </IconButton>
    )
}

export default RemoveButton;