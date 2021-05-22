import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Link from "@material-ui/core/Link";
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

const BubbleList = (props: { list: {}[] }) => {
    const classes = useStyles();

    const displayItem = (item: any) => {
        return (
            <ListItem key={item.id}  className={classes.contentTag}  >
                <Link href={item.url} target="_blank" className={classes.link} >
                    {item.common_name ? `${item.common_name} (${item.name})` : item.name}
                </Link>
            </ListItem>
        )
    }

    return (
        <List>
            {props.list.map(item => displayItem(item))}
        </List>
    )
}

export default BubbleList;