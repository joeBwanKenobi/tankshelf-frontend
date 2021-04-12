import { ChangeEvent, useState } from 'react';
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import makeStyles from '@material-ui/styles/makeStyles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { State } from './CreateTankView';

const useStyles = makeStyles((theme: Theme) => ({
    form: {
        maxWidth: '50vw',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    formControl: {
        margin: theme.spacing(2, 0, 2),
        minWidth: 120,
        width: '50%'
    },
    typeControl: {
        paddingRight: theme.spacing(2)
    }
}));

const TankContents = ({handleChange, values}: {handleChange: Function, values: State}) => {
        const classes = useStyles();

    return(
        <form className={classes.form}>
            <div>
            <TextField 
                label="Tank Contents"
                id="tankContents"
                defaultValue=""
                value={values.images}
                variant="outlined"
                fullWidth
                onChange={handleChange('images')}
                
            />
            </div>
        </form>
    )
}

export default TankContents;