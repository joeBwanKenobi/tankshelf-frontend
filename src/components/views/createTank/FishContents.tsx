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
    const [pattern, setPattern] = useState("");
    const [suggestions, setSuggestions] = useState<(Fuse.FuseResult<Fish>)[]>();
    const [selected, setSelected] = useState<any[]>([]);
    const [visible, setVisible] = useState<'visible' | 'hidden'>('hidden');

    // Set parent component state, fill with contents
    useEffect(() => {
        // If a user goes to another step from fish we want to populate fish already selected and stored in parent state
        if (selected.length === 0 && values.inhabitants != undefined) {
            setSelected([...values.inhabitants]);
        }

        let contents = {
            fish: selected
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

    // Create Fuse object to use for fuzzy search
    const fishFuse = new Fuse(values.fishList, options);

    const handleSearch = (e: SyntheticEvent) => {
        const target = e.target as HTMLInputElement;
        if (target.value == "") {
            setPattern("");
        } else {
            setPattern(target.value);
            setVisible('visible');

            const fish = fishFuse.search(pattern);
            setSuggestions(fish);

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
            <ListItem key={suggestion.item.fishID} data-id={suggestion.item.fishID} value={suggestion.item.name != null ? suggestion.item.name : ""} className={classes.listItem} onClick={valueSelected}>
                {suggestion.item.common_name} ({suggestion.item.name})
            </ListItem>
        )

    }

    const populateSelections = (selection: any) => {
        let res = values.fishList.filter(plant => plant.fishID === selection.fishID)
        let displayName = res[0].common_name !== "" ? `${res[0].common_name} (${res[0].name})` : res[0].name;
        return (
            <ListItem key={res[0].fishID} data-id={res[0].fishID} value={res[0].name != null ? res[0].name : ""} className={classes.contentTag}>
                {displayName}
            </ListItem>
        )
    }

    const valueSelected = (e: SyntheticEvent) => {
        const name = e.currentTarget.textContent
        const targetId = parseInt(e.currentTarget.getAttribute('data-id') as string)
        setVisible('hidden');
        setSelected(selected => [...selected, { name: name, fishID: targetId }]);
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
                <TextField
                    label="Fish Name"
                    id="fishNameInput"
                    defaultValue=""
                    value={pattern}
                    onChange={handleSearch}
                    variant="outlined"
                    fullWidth
                    className={classes.typeControl}
                    onFocus={() => setVisible('visible')}
                    onBlur={handleFocusOut}
                />
                <List component="ul" className={classes.fishList} style={{ visibility: visible }}>
                    {suggestions != undefined ? suggestions.map((s: any) => populateSuggestions(s)) : ""}
                </List>
            </div>
        </form>
    )
}

export default FishContents;