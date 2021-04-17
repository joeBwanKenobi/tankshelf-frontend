import React, { useEffect } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import CardHeader from '@material-ui/core/CardHeader';
import Divider from '@material-ui/core/Divider';
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
      width: '100%',
    },
    header: {
      width: '100%',
    },
    details: {
      marginLeft: 'auto',
    },
    mediaContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
    thumbnailContainer: {
      width: '100%',
      margin: theme.spacing(2, 0, 2, 0),
      display: 'flex',
      justifyContent: 'start'
    },
    thumbnail: {
      width: '80%'
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
    },
    divider: {
      margin: theme.spacing(2, 0, 2, 0)
    },
  }),
);

export default function TankDisplay(props: Tank) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const ageInWeeks = props.age ? Math.round(Utils.ageInDays(props.age) / 7) : null;

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  // Creates Grid item for each tank object in list
  const displayImage = (image: any) => {
    console.log(image);
    return(
        <Grid item xs={12} sm={4} key={image} >
            <img src={`${process.env.REACT_APP_IMAGE_CDN_DOMAIN}${image?.url}`} className={classes.thumbnail} />
        </Grid>
    )
}

  // const streamOrImg = (stream: string | null | undefined) => {
  //   let media;
  //   if(props.images[0]?.url === undefined) { return; }
  //   if (stream === undefined || null) {
  //     console.log('calling for iamge in streamOrImg():')
  //     console.log(props.images);
  //     console.log(`${process.env.REACT_APP_IMAGE_CDN_DOMAIN}${props.images[0]?.url}`)
  //     media = <CardMedia className={classes.media} image={`${process.env.REACT_APP_IMAGE_CDN_DOMAIN}${props.images[0]?.url}`} title={props.name} />
  //   } else {
  //     console.log('has stream', stream)
  //     media = <VideoPlayer source={stream as string} />
  //   }
  //   return media;
  // }


  return (
    <Grid container className={classes.root} spacing={2} >
      <Grid item xs={12}>
        <CardHeader
          className={classes.header}
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
      </Grid>
      <Grid item container xs={12} lg={6} className={classes.mediaContainer}>
        <img className={classes.media} src={`${process.env.REACT_APP_IMAGE_CDN_DOMAIN}${props.images[0]?.url}`} title={props.name} />
        <Grid item xs={12} className={classes.thumbnailContainer}>
          {props.images.map(image => displayImage(image))}
        </Grid>
      </Grid>

      <Grid item xs={12} lg={6}>
        <Typography color="textSecondary" component="p">
            {`This is a ${props.type} tank that has been evolving for ${ageInWeeks} weeks.`}
          </Typography>
          <Divider className={classes.divider}></Divider>
          <Typography>
            Types of plants found in this tank:
          </Typography>
      </Grid>
    </Grid>
  );
}
