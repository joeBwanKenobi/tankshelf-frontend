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

const TankDetails = ({handleChange, values}: {handleChange: Function, values: State}) => {
        const classes = useStyles();

    return(
        <form className={classes.form}>
            <div>
            <TextField 
                label="Tank Name"
                id="tankName"
                defaultValue=""
                value={values.name}
                variant="outlined"
                fullWidth
                onChange={handleChange('name')}
                
            />
            </div>
            <div>
                <FormControl variant="outlined" className={`${classes.formControl} ${classes.typeControl}`}>
                    <InputLabel id="type-label">Type</InputLabel>
                <Select
                    labelId="type-label"
                    id="type"
                    label="Type"
                    value={values.type}
                    onChange={handleChange('type')}
                    autoWidth
                >
                    <MenuItem value={"Freshwater"}>
                        Freshwater
                    </MenuItem>
                    <MenuItem value={"Saltwater"}>
                        Saltwater
                    </MenuItem>
                    <MenuItem value={"Terrarium"}>
                        Terrarium
                    </MenuItem>
                </Select>
                </FormControl>

                <TextField 
                label="When did you start this tank?"
                id="age"
                type="date"
                defaultValue={new Date().toLocaleDateString()}
                margin="normal"
                variant="outlined"
                InputLabelProps={{
                    shrink: true,
                }}
                className={classes.formControl}
                onChange={handleChange('age')}
                value={values.age}
                />
            </div>
            <TextField
                id="description"
                label="Description"
                multiline
                fullWidth
                rows={5}
                defaultValue="Is there anything you'd like to let people know about this tank?  You will be asked to add types of fish and plants in a following step."
                variant="outlined"
                onChange={handleChange('description')}
                value={values.description}
            />
        </form>
    )
}

export default TankDetails;