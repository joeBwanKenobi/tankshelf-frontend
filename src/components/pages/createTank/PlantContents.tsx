import { useEffect, useState } from 'react';
import Fuse from 'fuse.js';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import makeStyles from '@material-ui/styles/makeStyles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import Plant from '../../../constants/plant.interface';
import FuzzySearch from '../../fuzzySearch/FuzzySearch';

const useStyles = makeStyles((theme: Theme) => ({
    form: {
        maxWidth: '50vw',
        marginLeft: 'auto',
        marginRight: 'auto',
        // height: '50vh',

    },
    formControl: {
        margin: theme.spacing(2, 0, 2),
    },
    typeControl: {
        margin: theme.spacing(2, 0, 2, 0)
    },
    divider: {
        margin: theme.spacing(2, 0, 2, 0)
    },
    plantList: {
        flexDirection: "column",
        width: '100%',
        flexWrap: "wrap",
        // height: "60vh",
        overflow: "auto"
    },
    listItem: {
        background: "white",
        color: 'black',
        height: theme.spacing(6),
        width: "100%",
        borderBottom: 'black 1px solid'
    },
    plantContents: {
        display: 'block',
    },
    contentTag: {
        display: 'inline-block',
        fontSize: '12px',
        lineHeight: '1',
        margin: theme.spacing(.5),
        padding: theme.spacing(1),
        background: "#303030",
        width: 'auto',
        borderRadius: '25px',
    }
}));

const PlantContents = ({ addContents, plantsList, plants }: { addContents: Function, plantsList: Plant[], plants?: Plant[] }) => {
    const classes = useStyles();
    const [selected, setSelected] = useState<any[]>([]);

    // Set parent component state, fill with contents
    useEffect(() => {
        // If a user goes to another step from plants we want to populate plants already selected and stored in parent state
        if (selected.length === 0 && plants != undefined) {
            setSelected([...plants]);
        }
        // Populate object to add selected contents to tank in Parent state
        let contents = {
            plants: selected
        }
        addContents(contents);
    },[selected])

    const populateSelections = (selection: any) => {
        let res = plantsList.filter(plant => plant.id === selection.id)        
        return (
            <ListItem key={res[0].id} data-id={res[0].id} value={res[0].name != null ? res[0].name : ""} className={classes.contentTag}>
                {res[0].name}
            </ListItem>
        )
    }

    return (
        <form className={classes.form}>
            <div>
                <div>
                    <Typography variant="h5">
                        Plant Contents:
                    </Typography>
                    <List component="ul" className={classes.plantContents}>
                        {selected.map(s => populateSelections(s))}
                    </List>
                </div>

                <Typography>
                    Search for types of plants in your tank.
                </Typography>
                <FuzzySearch listToSearch={plantsList} selectionCallback={setSelected} label={"Plant Type"}  />
            </div>
        </form>
    )
}

export default PlantContents;