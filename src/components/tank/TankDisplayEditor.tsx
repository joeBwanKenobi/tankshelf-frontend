import { SyntheticEvent, useState, useEffect } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CardHeader from '@material-ui/core/CardHeader';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
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
import Paper from '@material-ui/core/Paper';
import AuthContext from '../contexts/auth/AuthContext';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import EditButton from '../buttons/EditButton';
import Plant from '../../constants/plant.interface';
import Fish from '../../constants/fish.interface';
import PlantContents from '../pages/createTank/PlantContents';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    paper: {
      padding: theme.spacing(2)
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
      width: '80%',
      height: '100%',
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
    },
    sectionTitle: {
      paddingBottom: theme.spacing(2),
      textDecoration: 'underline'
    },
    removeButton: {
      background: '#b2102f',
      position: 'relative',
      bottom: '95%',
      left: '14px',
      '&:hover': {
        background: '#ff1744'
      }
    }
  }),
);

export interface State {
  activeStep: number;
  name: string;
  type: "Freshwater" | "Saltwater" | "Terrarium" | "";
  age: any;
  description: string;
  images: any[];
  plants?: Plant[];
  inhabitants?: Fish[];
  plantsList: Plant[] | [];
  fishList: Fish[] | [];
}

export interface Updates {
  images?: any[];
  description?: string;
  plants?: Plant[];
  inhabitants?: Fish[];
}

export interface TankUpdate extends Tank {
  plantsList: Plant[] | [];

}

export default function TankDisplayEditor(props: TankUpdate) {

  const classes = useStyles();
  const ageInWeeks = props.age ? Math.round(Utils.ageInDays(props.age) / 7) : null;

  const IMAGES_API_URL = `${process.env.REACT_APP_IMAGE_API_URL}`

  // Editor variables to control sections
  const [mediaEdit, setMediaEdit] = useState(false);
  const [descriptionEdit, setDescriptionEdit] = useState(false);
  const [inhabitantsEdit, setInhabitantsEdit] = useState(false);

  // State variables for tank details
  const [updates, setUpdates] = useState<Updates>({});

  const deleteImage = (e: React.SyntheticEvent) => {
    const imageID = e.currentTarget.getAttribute('data-imageid')
    console.log(`deleting image: ${IMAGES_API_URL}/${imageID}`);
  }

  const handleChange = (input: keyof State) => (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    setUpdates({ ...updates, [input]: target.value });
  }

  const addContents = (selectedContents: any) => {
    if ('plants' in selectedContents) {
      console.log('plants!')
      console.log(selectedContents);
      setUpdates({ plants: [...selectedContents.plants] });
    }
    if ('fish' in selectedContents) {
      console.log('fish!')
      console.log(selectedContents);
      setUpdates({ inhabitants: [...selectedContents.fish] });
    }
  }

  // Creates Grid item for each tank object in list
  const displayImage = (image: any) => {
    return (
      <Grid item xs={12} sm={4} key={image.url} >
        {mediaEdit &&
          <IconButton size="small" className={classes.removeButton} onClick={deleteImage} data-imageid={image.imageID}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
        <img src={`${process.env.REACT_APP_IMAGE_CDN_DOMAIN}${image?.url}`} className={classes.thumbnail} />
      </Grid>
    )
  }

  return (

    <Grid container className={classes.root} spacing={2} >
      <Grid item xs={12}>
        <CardHeader
          className={classes.header}
          avatar={
            <Avatar src="/broken-image.jpg" />
          }
          title={props.name}
          subheader={`Type: ${props.type} - Age: ${ageInWeeks} weeks`}
        />
      </Grid>
      <Grid item container xs={12}>
        <Typography variant="h5" className={classes.sectionTitle}>
          Media
            <EditButton editing={mediaEdit} setEditing={setMediaEdit} />
        </Typography>
        <div className={classes.mediaContainer}>
          <Grid item xs={12} className={classes.thumbnailContainer}>
            {props.images.map(image => displayImage(image))}
          </Grid>
        </div>
      </Grid>

      <Grid item xs={12} >
        <Typography variant="h5" className={classes.sectionTitle}>
          Description
            <EditButton editing={descriptionEdit} setEditing={setDescriptionEdit} />
        </Typography>
        {/* If description is being edited, render a text area with existing description data */}
        {descriptionEdit ?
          <TextField
            id="description"
            label="Description"
            multiline
            fullWidth
            rows={5}
            variant="outlined"
            onChange={handleChange('description')}
            value={updates.description || updates.description === "" ? updates.description : props.description}
          />
          :
          <Typography color="textSecondary" component="p">
            {updates.description ? updates.description : props.description}
          </Typography>
        }


        <Divider className={classes.divider}></Divider>

        {props.plants &&
          <div>
            <Typography variant="h5" className={classes.sectionTitle}>
              Inhabitants
                <EditButton editing={inhabitantsEdit} setEditing={setInhabitantsEdit} />
            </Typography>
            <Typography>
              Types of plants found in this tank:
            </Typography>
            { props.plants && props.plantsList ? 
              <PlantContents addContents={addContents} plants={props.plants} plantsList={props.plantsList} />
              :
              ''
            }
            
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
