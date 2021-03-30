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

const TankMedia = ({handleChange, values}: {handleChange: Function, values: State}) => {
    const classes = useStyles();
    const [images, setImages] = useState<any[]>([]);

    // const displayImage = (file: File) => {
    //     const reader = new FileReader();
    //     reader.onload = function(e) {
    //         const imageEl = document.getElementById('image') as HTMLImageElement;
    //         if (imageEl !== null && e.target !== null) {
    //             imageEl.src = e.target.result as string;
    //         }
    //     }
    //     // const image = reader.readAsDataURL(file).result;
    //     // const imageEl = document.getElementById('image') as HTMLImageElement;
        
    // }

    const handleFileAdd = (e: ChangeEvent) => {
        const target = e.target as HTMLInputElement;
        const files = target.files as FileList;
        
        // Using URL.createObjectURL
        if (files && files[0]) {
            setImages(images => [...images, URL.createObjectURL(files[0])]);
        }

        // Using FileReader
        // if (target.files && target.files[0]) {
        //     let reader = new FileReader();
        //     reader.onload = (e) => {
        //         setImages(images => [...images, e.target?.result]);
        //     }
        //     reader.readAsDataURL(target.files[0]);
        // } 
    }

    return(
        <form className={classes.form}>
            <div>
            {/* <TextField 
                label="Tank Image"
                id="tankImage"
                defaultValue=""
                value={values.image}
                variant="outlined"
                fullWidth
                onChange={handleChange('image')}
                
            /> */}
            <img id="image" src={images[0]} />
            <input type="file" id="image" multiple onChange={handleFileAdd}></input>
            </div>
        </form>
    )
}

export default TankMedia;