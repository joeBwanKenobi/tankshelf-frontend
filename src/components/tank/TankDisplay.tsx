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




export default function TankDisplay({id, name, type, age, imageSrc, streamSrc, details}: Tank) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const ageInWeeks = age ? age / 7 : null;
  const hasStream = streamSrc !== undefined;

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  let media;
  if (hasStream) {
    media = <VideoPlayer source={streamSrc as string} />
  } else {
    media = <CardMedia className={classes.media} image={imageSrc} title={name} />
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
        title={name}
        subheader={type}
      />
      {media}
      <CardContent>
      <Button
        className={classes.playButton}
        variant="contained"
        color="primary"
        endIcon={<PlayArrowIcon />}
      >
        Play Stream
      </Button>
        <Typography variant="body2" color="textSecondary" component="p">
          {`This is a ${type} tank that has been evolving for ${ageInWeeks} weeks.`}
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
            {details}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
