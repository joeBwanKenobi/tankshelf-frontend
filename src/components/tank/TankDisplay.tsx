import React, { useEffect } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CardHeader from '@material-ui/core/CardHeader';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Tank } from '../../constants/tank.interface';
import { Button, Icon, ListItemText } from '@material-ui/core';
import VideoPlayer from '../media/VideoPlayer';
import * as Utils from '../../utils/utils';
import PlantsList from '../plants/PlantsList';
import FishList from '../fish/FishList';
import DrowDownMenu from '../menus/DropDownMenu';


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
    tankOptions: {
      width: theme.spacing(8),
      background: 'red',
    }
  }),
);

export default function TankDisplay(props: Tank) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  // Set anchor elements for opening menus
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const ageInWeeks = props.age ? Math.round(Utils.ageInDays(props.age) / 7) : null;

  // Creates Grid item for each tank object in list
  const displayImage = (image: any) => {
    return (
      <Grid item xs={12} sm={4} key={image.url} >
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


  const menuItems = [
    { label: 'Edit', url: '/tank/edit' }
  ];

  return (
    <Grid container className={classes.root} spacing={2} >
      <Grid item xs={12}>
        <CardHeader
          className={classes.header}
          avatar={
            <Avatar src="/broken-image.jpg" />
          }
          action={
            <DrowDownMenu data={menuItems} buttonContent={<MoreVertIcon />} icon={true} />
          }
          title={props.name}
          subheader={`Type: ${props.type} - Age: ${ageInWeeks} weeks`}
        />
      </Grid>
      <Grid item container xs={12} md={6} className={classes.mediaContainer}>
        <img className={classes.media} src={`${process.env.REACT_APP_IMAGE_CDN_DOMAIN}${props.images[0]?.url}`} title={props.name} />
        <Grid item xs={12} className={classes.thumbnailContainer}>
          {props.images.map(image => displayImage(image))}
        </Grid>
      </Grid>

      <Grid item xs={12} md={6}>
        <Typography color="textSecondary" component="p">
          {props.description}
        </Typography>
        <Divider className={classes.divider}></Divider>

        {props.plants &&
          <div>
            <Typography>
              Types of plants found in this tank:
            </Typography>
            <PlantsList listOfPlants={props.plants} />
          </div>
        }

        {props.fish != undefined && props.fish.length > 0 &&
          <div>
            <Typography>
              Types of fish found in this tank:
            </Typography>
            <FishList listOfFish={props.fish} />
          </div>
        }

      </Grid>
    </Grid>
  );
}
