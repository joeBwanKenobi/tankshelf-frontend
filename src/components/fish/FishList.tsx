import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Link from "@material-ui/core/Link";
import Fish from "../../constants/fish.interface";
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
    link: {
        color: 'white'
    },
    contentTag: {
        display: 'inline-block',
        color: 'white',
        fontSize: '12px',
        lineHeight: '1',
        margin: theme.spacing(.5),
        padding: theme.spacing(1),
        background: "#1d1d1d",
        width: 'auto',
        borderRadius: '25px',
        '&:hover': {
            background: "#1f5834"
        }
    }
}));

const FishList = (props: { listOfFish: Fish[] }) => {
    const classes = useStyles();

    const displayPlant = (fishObject: any) => {
        return (
            <ListItem key={fishObject.fishID}  className={classes.contentTag}  >
                <Link href={fishObject.url} target="_blank" className={classes.link} >
                    {fishObject.common_name ? `${fishObject.common_name} (${fishObject.name})` : fishObject.name}
                </Link>
            </ListItem>
        )
    }

    return (
        <List>
            {props.listOfFish.map(fishObject => displayPlant(fishObject))}
        </List>
    )
}

export default FishList;