import { Dispatch, SetStateAction, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(1),
      textTransform: 'none'
    },
  }),
);

interface Props {
    editing: boolean;
    setEditing: Dispatch<SetStateAction<boolean>>;
}

export const EditButton = (props: Props) => {
    const classes = useStyles();

    const handleClick = () => {
        props.setEditing(!props.editing);
    }

    return (
        props.editing ? 
            <Button
            variant="contained"
            color="primary"
            size="small"
            className={classes.button}
            onClick={handleClick}
            >
                Save
            </Button>
            :
            <IconButton size="small" onClick={handleClick}>
                <EditIcon fontSize="small" />
            </IconButton>
    )
}

export default EditButton;