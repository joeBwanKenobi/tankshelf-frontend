import { ChangeEvent } from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { withStyles, createStyles, WithStyles } from '@material-ui/core/styles';
import { useState, Fragment, Component, SyntheticEvent } from 'react';
import { Theme } from '@material-ui/core/styles';
import TankContents from './TankContents';
import TankDetails from './TankDetails';
import TankMedia from './TankMedia';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import * as Utils from '../../utils/utils';
import axios from 'axios';


const styles = (theme: Theme) => createStyles(({
    mainContent: {
        padding: theme.spacing(5, 0, 8)
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
        paddingRight: theme.spacing(5)
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
    stepperContainer: {
        padding: theme.spacing(4, 4, 4)
    },
    stepper: {
        padding: theme.spacing(5, 10, 7),
    },
}));

interface Props extends WithStyles<typeof styles> {};

export interface State {
    activeStep: number;
    name: string;
    type: "Freshwater" | "Saltwater" | "Terrarium" | "";
    age: any;
    description: string;
    images: any[];
}

// Type with specific attributes from State Interface
export type NewTank = Pick<State, "name" | "age" | "description" | "type" | "images">;

const steps = ['Details', 'Contents', 'Media'];

class CreateTankView extends Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            activeStep: 0,
            name: "",
            type: "",
            age: null,
            description: "",
            images: []
        }
    }

    handleNext = () => {
        this.setState({ activeStep: this.state.activeStep + 1 });
    };

    handleBack = () => {
        this.setState({ activeStep: this.state.activeStep - 1 });
    };

    // handleChange gets passed to child components in the form to update the state of this master CreateTankView component.
    // This allows pagination through the stepper with the ability to retain values in state
    handleChange = (input: keyof State) => (e: SyntheticEvent) => {
        const target = e.target as HTMLInputElement;
        console.log(target.value, input)
        this.setState(state => ({
            ...state,    
            [input]: target.value // handleChange('name') would update the state value for the 'name' entry
        }));
    }

    handleImageAdd = (e: ChangeEvent) => {
        const target = e.target as HTMLInputElement;
        const files = target.files as FileList;
        const filesForState: any[] = []

        for (let i=0; i < files.length; i++) {
            filesForState.push(files[i])
        }

        this.setState(state => ({
            ...state,
            images: [
                ...this.state.images,
                ...filesForState
            ]
        }));
    }

    handleSubmit = async(e: SyntheticEvent) => {
        e.preventDefault();
        console.log('adding following state to databse');
        console.log(this.state.images)
        const newTank: NewTank = {
            name: this.state.name,
            description: this.state.description,
            type: this.state.type,
            images:  this.state.images,
            age: Date.parse(this.state.age)
        }

        // Create multipart formdata to upload images
        const imagesFormData = new FormData();
        // add each image stored in state to formdata
        this.state.images.forEach(image => {
            imagesFormData.append(image.name, image);
        });

        // Utils.uploadImages(imagesFormData);

        // console.log(newTank);
        Utils.addTank(newTank)
        .then(res => {
            imagesFormData.append('tankID', res.id);
            Utils.uploadImages(imagesFormData, res.id);
        }).catch(e => console.error(e));
    }

    getStepContent = (step: number, values: State) => {
        switch (step) {
            case 0:
                return <TankDetails handleChange={this.handleChange} values={values} />;
            case 1:
                return <TankContents handleChange={this.handleChange} values={values} />;
            case 2:
                return <TankMedia handleImageAdd={this.handleImageAdd} values={values} />;
        }
    }

    render() {
        const { classes } = this.props;
        const { name, type, age, description, images } = this.state;
        const values = { name, type, age, description, images } as State;

        return (
            <Container maxWidth="lg" className={classes.mainContent}>
                <Paper className={classes.stepperContainer}>
                    <Typography variant="h4" align="center">
                        Create a new tank
                </Typography>

                    <Stepper activeStep={this.state.activeStep} className={classes.stepper} >
                        {steps.map((label, index) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>

                    <Fragment>
                        {this.state.activeStep === steps.length ? (
                            <Fragment>
                                <Typography variant="h5" gutterBottom>
                                    Complete
                            </Typography>
                            </Fragment>

                        ) : (
                            <Fragment>
                                {this.getStepContent(this.state.activeStep, values)}
                                <div className={classes.buttons}>
                                    {this.state.activeStep !== 0 && (
                                        <Button onClick={this.handleBack} className={classes.button}>
                                            Back
                                        </Button>
                                    )}
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={this.state.activeStep === steps.length - 1 ? this.handleSubmit : this.handleNext}
                                        className={classes.button}
                                    >
                                        {this.state.activeStep === steps.length - 1 ? 'Add Tank' : 'Next'}
                                    </Button>
                                </div>
                            </Fragment>
                        )}

                    </Fragment>

                </Paper>
            </Container>
        )
    }
};

export default withStyles(styles)(CreateTankView);