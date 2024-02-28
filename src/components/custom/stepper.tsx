import {
  Box,
  Step,
  StepDescription,
  StepIndicator,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
} from "@chakra-ui/react";
import React from "react";
import { useWindowWidth } from "utilities/windowWidth";

export type StepProps = {
  steps: {
    title: string;
    description: string;
    icon: React.ReactNode;
    activeIcon: React.ReactNode;
  }[];
  activeStep: number;
};

export type StepperProps = StepProps;

export const StepperComponent: React.FC<StepperProps> = ({
  steps,
  activeStep,
}) => {
  const windowWidth = useWindowWidth();
  return (
    <Stepper
      index={activeStep}
      orientation={windowWidth >= 768 ? "vertical" : "horizontal"}
      height={windowWidth >= 768 ? "380px" : "70px"}
      className={`${windowWidth >= 768 ? "" : "align-items-start"}`}
      gap="0"
    >
      {steps.map((step, index) => (
        <Step key={index} className="gap-3">
          {/* <Step className={`d-flex ${ windowWidth >= 768 ? 'flex-row' : 'flex-column' }`}> */}
          <StepIndicator className="bg-primary-50 border-0">
            <StepStatus
              complete={step.activeIcon}
              incomplete={step.icon}
              active={step.activeIcon}
            />
          </StepIndicator>

          <Box flexShrink="0">
            <StepTitle
              className={`${
                windowWidth <= 768 ? "fs-11 fw-400 text-grey-600" : ""
              } mb-1`}
            >
              {step.title}
            </StepTitle>
            {windowWidth >= 768 && (
              <StepDescription>{step.description}</StepDescription>
            )}
          </Box>
          {/* </Step> */}
          <StepSeparator
            className="w-1-px top-0 bg-primary-100"
            style={{ maxHeight: "unset", width: 1, zIndex: -1 }}
          />
        </Step>
      ))}
    </Stepper>
  );
};
