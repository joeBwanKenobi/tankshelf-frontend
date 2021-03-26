import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useState, Fragment } from 'react';
import { Theme } from '@material-ui/core/styles';
import TankContents from './TankContents';
import TankDetails from './TankDetails';
import TankMedia from './TankMedia';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
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



const CreateTankView = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [formData, setFormData] = useState({
        name: "",
        type: "",
        age: null,
        description: ""
    });

    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    const handleFormChange = (data: any) => {
        const form ={ ...data }
        console.log(form);
        setFormData(form);
    }

    const steps = ['Details', 'Contents', 'Media'];

    const getStepContent = (step: number) => {
        switch (step) {
            case 0:
                // return <TankDetails handleFormChange={handleFormChange} />;
            case 1:
                return <TankContents />;
            case 2:
                return <TankMedia />;
        }
    }

    const classes = useStyles();
    return (
        <Container maxWidth="lg" className={classes.mainContent}>
            <Paper className={classes.stepperContainer}>
                <Typography variant="h4" align="center">
                    Create a new tank
                </Typography>

                <Stepper activeStep={activeStep} className={classes.stepper} >
                    {steps.map((label, index) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>

                <Fragment>
                    {activeStep === steps.length ? (
                        <Fragment>
                            <Typography variant="h5" gutterBottom>
                                Complete
                            </Typography>
                        </Fragment>

                    ) : (
                        <Fragment>
                            {getStepContent(activeStep)}
                            <div className={classes.buttons}>
                                {activeStep !== 0 && (
                                    <Button onClick={handleBack} className={classes.button}>
                                        Back
                                    </Button>
                                )}
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleNext}
                                    className={classes.button}
                                >
                                    {activeStep === steps.length - 1 ? 'Add Tank' : 'Next'}
                                </Button>
                            </div>
                        </Fragment>
                    )}

                </Fragment>

            </Paper>
        </Container>
    )
};

export default CreateTankView;