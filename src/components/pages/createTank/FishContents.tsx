import { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react';
import Fuse from 'fuse.js';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem, { ListItemProps } from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import MenuItem from '@material-ui/core/MenuItem';
import makeStyles from '@material-ui/styles/makeStyles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { State } from './CreateTankView';
import Plant from '../../../constants/plant.interface';
import Fish from '../../../constants/fish.interface';
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
    fishList: {
        flexDirection: "column",
        width: '100%',
        flexWrap: "wrap",
        height: "60vh",
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

const FishContents = ({ addContents, values }: { addContents: Function, values: State }) => {
    const classes = useStyles();
    const [selected, setSelected] = useState<any[]>([]);

    // Set parent component state, fill with contents
    useEffect(() => {
        console.log(selected);
        
        // If a user goes to another step from fish we want to populate fish already selected and stored in parent state
        if (selected.length === 0 && values.inhabitants != undefined) {
            setSelected([...values.inhabitants]);
        }

        let contents = {
            fish: selected
        }
        addContents(contents);
    },[selected])

    const populateSelections = (selection: any) => {
        console.log(selection)
        let res = values.fishList.filter(fish => fish.fishID === selection.fishID)
        let displayName = res[0].common_name !== "" ? `${res[0].common_name} (${res[0].name})` : res[0].name;
        return (
            <ListItem key={res[0].fishID} data-id={res[0].fishID} value={res[0].name != null ? res[0].name : ""} className={classes.contentTag}>
                {displayName}
            </ListItem>
        )
    }

    return (
        <form className={classes.form}>
            <div>
                <div>
                    <Typography variant="h5">
                        Inhabitants:
                    </Typography>
                    <List component="ul" className={classes.plantContents}>
                        {selected.map(s => populateSelections(s))}
                    </List>
                </div>
                <Typography>
                    Search types of fish in your tank.
                </Typography>
                <FuzzySearch listToSearch={values.fishList} selectionCallback={setSelected} label={"Fish Type"} />
            </div>
        </form>
    )
}

export default FishContents;