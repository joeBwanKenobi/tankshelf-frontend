import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import { Tank } from '../../constants/tank.interface';
import { Button, Icon } from '@material-ui/core';
import VideoPlayer from '../media/VideoPlayer';
import * as Utils from '../utils/utils';
import { LocalPrintshopSharp } from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    details: {
      marginLeft: 'auto',
    },
    expand: {
      transform: 'rotate(0deg)',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
    playButton: {
      marginBottom: theme.spacing(2)
    }
  }),
);

export default function TankDisplay(props: Tank) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const ageInWeeks = props.age ? Math.round(Utils.ageInDays(props.age) / 7) : null;

  console.log(props)
  console.log(props.images)
  console.log(props.images[0]?.url)

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  function streamOrImg(stream: string | null | undefined) {
    let media;
    if (stream == undefined || null) {
      // console.log('no stream', stream, props.images[0].url)
      media = <CardMedia className={classes.media} image={`${process.env.REACT_APP_IMAGE_CDN_DOMAIN}${props.images[0]?.url}`} title={props.name} />
    } else {
      console.log('has stream', stream)
      media = <VideoPlayer source={stream as string} />
    }
    return media;
  }

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
            <Avatar src="/broken-image.jpg" />
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={props.name}
        subheader={props.type}
      />
      {streamOrImg(props.stream)}
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {`This is a ${props.type} tank that has been evolving for ${ageInWeeks} weeks.`}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <Typography className={classes.details} variant="body1">Details</Typography>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>
            {props.description}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
