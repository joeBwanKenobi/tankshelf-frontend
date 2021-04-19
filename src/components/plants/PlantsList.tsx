import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Link from "@material-ui/core/Link";
import Plant from "../../constants/plant.interface";
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

const PlantsList = (props: { listOfPlants: Plant[] }) => {
    const classes = useStyles();

    const displayPlant = (plantObject: any) => {
        return (
            <ListItem key={plantObject.name}  className={classes.contentTag}  >
                <Link key={plantObject.name} href={plantObject.url} target="_blank" className={classes.link}  >
                    {plantObject.common_name ? `${plantObject.common_name} (${plantObject.name})` : plantObject.name}
                </Link>
            </ListItem>
        )
    }

    return (
        <List>
            {props.listOfPlants.map(plantObject => displayPlant(plantObject))}
        </List>
    )
}

export default PlantsList;