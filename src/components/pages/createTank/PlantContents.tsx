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

const PlantContents = ({ addContents, values }: { addContents: Function, values: State }) => {
    const classes = useStyles();
    const [pattern, setPattern] = useState("");
    const [suggestions, setSuggestions] = useState<Fuse.FuseResult<Plant>[]>();
    const [selected, setSelected] = useState<any[]>([]);
    const [visible, setVisible] = useState<'visible' | 'hidden'>('hidden');

    // Set parent component state, fill with contents
    useEffect(() => {
        // If a user goes to another step from plants we want to populate plants already selected and stored in parent state
        if (selected.length === 0 && values.plants != undefined) {
            setSelected([...values.plants]);
        }

        let contents = {
            plants: selected
        }
        addContents(contents);
    },[selected])

    
    // Options for Fuse fuzzy search
    const options = {
        minMatchCharLength: 2,
        threshold: 0.3,
        keys: [
            "name",
            "common_name"
        ]
    }
    
    const plantFuse = new Fuse(values.plantsList, options);

    const handleSearch = (e: SyntheticEvent) => {
        const target = e.target as HTMLInputElement;
        if (target.value == "") {
            setPattern("");
        } else {
            setPattern(target.value);
            setVisible('visible');

            const plants = plantFuse.search(pattern);
            setSuggestions(plants);
        }
    }

    const handleFocusOut = (e: SyntheticEvent) => {
        setTimeout(() => {
            setVisible('hidden');
            setPattern("");
            setSuggestions([]);
        }, 100);

    }

    const populateSuggestions = (suggestion: any) => {
        return (
            <ListItem key={suggestion.item.plantID} data-id={suggestion.item.plantID} value={suggestion.item.name != null ? suggestion.item.name : ""} className={classes.listItem} onClick={valueSelected}>
                {suggestion.item.name}
            </ListItem>
        )

    }

    const populateSelections = (selection: any) => {
        let res = values.plantsList.filter(plant => plant.plantID === selection.plantID)
        return (
            <ListItem key={res[0].plantID} data-id={res[0].plantID} value={res[0].name != null ? res[0].name : ""} className={classes.contentTag}>
                {res[0].name}
            </ListItem>
        )
    }


    const valueSelected = (e: SyntheticEvent) => {
        const name = e.currentTarget.textContent
        const targetId = parseInt(e.currentTarget.getAttribute('data-id') as string)
        setVisible('hidden');
        setSelected(selected => [...selected, { name: name, plantID: targetId }]);
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
                <TextField
                    label="Plant Name"
                    id="plantNameInput"
                    defaultValue=""
                    value={pattern}
                    onChange={handleSearch}
                    variant="outlined"
                    fullWidth
                    className={classes.typeControl}
                    onFocus={() => setVisible('visible')}
                    onBlur={handleFocusOut}
                />
                <List component="ul" className={classes.plantList} style={{ visibility: visible }}>
                    {suggestions != undefined ? suggestions.map((s: any) => populateSuggestions(s)) : ""}
                </List>
            </div>
        </form>
    )
}

export default PlantContents;