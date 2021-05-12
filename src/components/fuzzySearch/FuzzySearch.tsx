import { useEffect, useState, Fragment, SyntheticEvent } from 'react';
import Fuse from 'fuse.js';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import TextField from '@material-ui/core/TextField';
import Plant from '../../constants/plant.interface';


export const FuzzySearch = (listToSearch: any) => {
    // Declare state variables
    const [pattern, setPattern] = useState("");
    const [suggestions, setSuggestions] = useState<Fuse.FuseResult<any>[]>();
    const [selected, setSelected] = useState<any[]>([]);
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

    const populateSuggestions = (suggestion: any) => {
        return (
            <ListItem key={suggestion.item.plantID} data-id={suggestion.item.plantID} value={suggestion.item.name != null ? suggestion.item.name : ""} className={classes.listItem} onClick={valueSelected}>
                {suggestion.item.name}
            </ListItem>
        )

    }

    return (
        <Fragment>
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
                />
                <List component="ul" className={classes.plantList} style={{ visibility: visible }}>
                    {suggestions != undefined ? suggestions.map((s: any) => populateSuggestions(s)) : ""}
                </List>
        </Fragment>
    )

}


export default FuzzySearch;