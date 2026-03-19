import { useState } from "react";

import { Stepper } from "./stepper";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof Stepper> = {
  title: "Components/Stepper",
  component: Stepper,
  tags: ["autodocs"],
  argTypes: {
    steps: {
      control: "object",
      description: "Array of steps, each with title and optional description.",
    },
    currentStep: {
      control: { type: "number", min: 0 },
      description: "Index of the current active step.",
    },
    onStepChange: {
      action: "step changed",
      description: "Callback when a step is changed.",
    },
    children: {
      control: false,
      description:
        "Optional content shown between step indicators and navigation buttons.",
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
A horizontal Stepper component for guiding users through multi-step workflows like onboarding or forms.

### Features
- Supports active, completed, and inactive steps
- Steps can be clicked (unless restricted)
- Inject custom content via \`children\`
- Responsive and accessible
        `,
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Stepper>;

const defaultSteps = [
  { title: "Step 1", description: "Create your account" },
  { title: "Step 2", description: "Verify your email" },
  { title: "Step 3", description: "Add your details" },
  { title: "Step 4", description: "Confirm and finish" },
];

// Default args-based story (good for Docs)
export const Default: Story = {
  args: {
    steps: defaultSteps,
    currentStep: 1,
    children: (
      <div className="p-6 border rounded mb-4">
        <h3 className="text-lg font-semibold mb-2">Step Content</h3>
        <p>This is the content area between steps and buttons.</p>
      </div>
    ),
  },
};

// Interactive story with state
const StepperWithState = () => {
  const [step, setStep] = useState(0);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Stepper with State
      </h2>
      <Stepper steps={defaultSteps} currentStep={step} onStepChange={setStep}>
        <div className="p-6 border rounded mb-4">
          <h3 className="text-lg font-semibold mb-2">Step Content</h3>
          <p>{defaultSteps[step].description}</p>
        </div>
      </Stepper>
    </div>
  );
};

export const WithState: Story = {
  name: "Stepper with State",
  render: () => <StepperWithState />,
  parameters: {
    docs: {
      description: {
        story:
          "This story demonstrates interactive navigation using `useState`. Steps and buttons update the active step dynamically.",
      },
    },
  },
};
