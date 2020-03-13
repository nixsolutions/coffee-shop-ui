import React from 'react';
import PropTypes from 'prop-types';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CheckoutEmailForm from '../CheckoutEmailForm/CheckoutEmailForm';
import ShippingForm from '../ShippingForm';
import ShippingLineForm from '../ShippingLineForm';
import useStyles from './Styles';

export default function StepperCompletedCheckout({ data, customerData }) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const customerEmail = () => {
    if (customerData) {
      return customerData.data.customer.email;
    } else {
      return '';
    }
  };
  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  function getSteps() {
    return ['Enter customer email', 'Enter shipping address', 'Enter shipping type'];
  }
  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <CheckoutEmailForm
            nextStep={handleNext}
            checkoutData={data}
            customerEmail={customerEmail}
          />
        );
      case 1:
        return <ShippingForm nextStep={handleNext} checkoutData={data} customer={customerData} />;
      case 2:
        return <ShippingLineForm nextStep={handleNext} checkoutData={data} />;
      default:
        return 'Unknown step';
    }
  }

  const steps = getSteps();

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label} component="div">
            <StepLabel>{label}</StepLabel>
            <StepContent>
              <Typography component="div">{getStepContent(index)}</Typography>
              <div className={classes.actionsContainer}>
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.button}
                  >
                    Back
                  </Button>
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Typography>All steps completed - you&apos;re finished</Typography>
        </Paper>
      )}
    </div>
  );
}

StepperCompletedCheckout.propTypes = {
  data: PropTypes.objectOf(Object).isRequired,
  customerData: PropTypes.objectOf(Object).isRequired
};
