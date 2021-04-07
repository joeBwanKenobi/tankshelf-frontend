import { ChangeEvent, ChangeEventHandler, useState } from 'react';
import Input from '@material-ui/core/Input';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
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
    },
    addedMedia: {
        width: '100%',
        padding: theme.spacing(1, 1, 1),
        border: "1px solid gold"
    },
    mediaContainer: {
        padding: theme.spacing(4, 0, 0)
    },
    imageInput: {
        display: "none"
    }
}));

const TankMedia = ({ handleImageAdd, values }: { handleImageAdd: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>, values: State }) => {
    const classes = useStyles();

    const displayImage = (image: any) => {
        console.log('displayImage()')
        console.log(image.name);
        const imageSrc = URL.createObjectURL(image);
        return (
            <Grid item xs={4} key={image.name}>
                <img className={classes.addedMedia} src={imageSrc} />
            </Grid>
        )
    }

    return (
        <form className={classes.form}>
            <div>
                <input
                    className={classes.imageInput}
                    id="image-input-hidden"
                    onChange={handleImageAdd}
                    type="file"
                    multiple
                />
                <label htmlFor="image-input-hidden">
                    <Button variant="contained" color="primary" component="span">
                        Add Image
                </Button>
                </label>
                <Grid container direction="row" justify="flex-start" alignItems="center" className={classes.mediaContainer} spacing={1}>
                    {values.images ? values.images.map(image => displayImage(image)) : ""}
                </Grid>
            </div>
        </form>
    )
}

export default TankMedia;