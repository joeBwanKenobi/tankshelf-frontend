import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { withStyles, createStyles, WithStyles } from '@material-ui/core/styles';
import { useState, Fragment, Component } from 'react';
import { Theme } from '@material-ui/core/styles';
import TankContents from './TankContents';
import TankDetails from './TankDetails';
import TankMedia from './TankMedia';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';


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

interface Props extends WithStyles<typeof styles> { };
interface State {
    activeStep: number;
    name: string;
    type: "Freshwater" | "Saltwater" | "Terrarium" | "";
    age: any;
    description: string;
}

const steps = ['Details', 'Contents', 'Media'];

class CreateTankView extends Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            activeStep: 0,
            name: "",
            type: "",
            age: null,
            description: ""
        }

        // this.handleChange = this.handleChange.bind(this);
    }

    handleNext = () => {
        this.setState({ activeStep: this.state.activeStep + 1 });
    };

    handleBack = () => {
        this.setState({ activeStep: this.state.activeStep - 1 });
    };

    handleChange = (input: string) => (e: MouseEvent) => {
        console.log('change')
        console.log(e)
        // this.setState({  })
    }

    getStepContent = (step: number, handleChange: Function, values: object) => {
        switch (step) {
            case 0:
                return <TankDetails handleChange={handleChange} values={values} />;
            case 1:
                return <TankContents />;
            case 2:
                return <TankMedia />;
        }
    }

    render() {
        const { classes } = this.props;
        const { name, type, age, description } = this.state;
        const values = { name, type, age, description };

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
                                {this.getStepContent(this.state.activeStep, this.handleChange, values)}
                                <div className={classes.buttons}>
                                    {this.state.activeStep !== 0 && (
                                        <Button onClick={this.handleBack} className={classes.button}>
                                            Back
                                        </Button>
                                    )}
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={this.handleNext}
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