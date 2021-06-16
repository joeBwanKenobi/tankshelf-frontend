import { useEffect, useState, Fragment, SyntheticEvent } from 'react';
import makeStyles from '@material-ui/styles/makeStyles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import Fuse from 'fuse.js';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import TextField from '@material-ui/core/TextField';
import Plant from '../../constants/plant.interface';

const useStyles = makeStyles((theme: Theme) => ({
    typeControl: {
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
}));

export const FuzzySearch = ({listToSearch, selectionCallback, label}: {listToSearch: any, selectionCallback: Function, label?: string}) => {
    const classes = useStyles();

    // Declare state variables
    const [pattern, setPattern] = useState("");
    const [suggestions, setSuggestions] = useState<Fuse.FuseResult<any>[]>();
    const [visible, setVisible] = useState<'visible' | 'hidden'>('hidden');

    // Options for Fuse fuzzy search
    const options = {
        minMatchCharLength: 2,
        threshold: 0.3,
        keys: [
            "name",
            "common_name"
        ]
    }

    const fuse = new Fuse(listToSearch, options);

    const handleSearch = (e: SyntheticEvent) => {
        const target = e.target as HTMLInputElement;  
        if (target.value == "") {
            setPattern("");
        } else {
            setPattern(target.value);
            setVisible('visible');

            const suggestions = fuse.search(pattern);
            setSuggestions(suggestions);
        }
    }

    const valueSelected = (e: SyntheticEvent) => {
        const name = e.currentTarget.textContent
        const targetId = parseInt(e.currentTarget.getAttribute('data-id') as string)
        setVisible('hidden');
        selectionCallback((selected: any) => [...selected, { name: name, id: targetId }]);
    }

    const populateSuggestions = (suggestion: any) => {
        return (
            <ListItem key={suggestion.item.id} data-id={suggestion.item.id} value={suggestion.item.name != null ? suggestion.item.name : ""} 
            className={classes.listItem} onClick={valueSelected}>
                {suggestion.item.name} {suggestion.item.common_name && ` (${suggestion.item.common_name})`}
            </ListItem>
        )
    }

    return (
        <Fragment>
                <TextField
                    label={`${label ? label : ""}`}
                    id="FuzzyInput"
                    defaultValue=""
                    value={pattern}
                    onChange={handleSearch}
                    variant="outlined"
                    fullWidth
                    className={classes.typeControl}
                    onFocus={() => setVisible('visible')}
                />
                <List component="ul" className={classes.plantList} style={{ visibility: visible }}>
                    {suggestions != undefined ? suggestions.map((s: any) => populateSuggestions(s)) : ""}
                </List>
        </Fragment>
    )

}


export default FuzzySearch;