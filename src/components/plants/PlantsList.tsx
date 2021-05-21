import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Link from "@material-ui/core/Link";
import Plant from "../../constants/plant.interface";
import { makeStyles, Theme } from '@material-ui/core/styles';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import ButtonBase from '@material-ui/core/ButtonBase';

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
    },
    editTag: {
        '&:hover': {
            background: "#b2102f"
        }
    }
}));

const PlantsList = (props: { listOfPlants: Plant[], edit?: boolean }) => {
    const classes = useStyles();

    const displayPlant = (plantObject: any) => {
        return (
                <ListItem key={plantObject.name} className={`${classes.contentTag} ${props.edit ? classes.editTag : ""}`}>
                    { props.edit &&
                        <ButtonBase>
                            <RemoveCircleIcon />
                        </ButtonBase>
                    }
                    <Link href={ props.edit ? null : plantObject.url} target="_blank" className={classes.link}  >
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