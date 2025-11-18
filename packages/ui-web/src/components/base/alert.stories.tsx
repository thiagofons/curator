import type { Meta, StoryObj } from "@storybook/react";

import { Alert, AlertDescription, AlertTitle } from "./alert";

const meta: Meta<typeof Alert> = {
  title: "Components/Base/Alert",
  component: Alert,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Default: Story = {
  render: () => (
    <Alert>
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        You can use alerts to subtly communicate important information.
      </AlertDescription>
    </Alert>
  ),
};

export const Destructive: Story = {
  render: () => (
    <Alert variant="destructive">
      <AlertTitle>Something went wrong</AlertTitle>
      <AlertDescription>
        There was a problem with your request. Please try again.
      </AlertDescription>
    </Alert>
  ),
};
