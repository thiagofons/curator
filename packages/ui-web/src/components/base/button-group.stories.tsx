import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "./button";
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from "./button-group";

const meta: Meta<typeof ButtonGroup> = {
  title: "Components/Base/ButtonGroup",
  component: ButtonGroup,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ButtonGroup>;

export const Default: Story = {
  render: () => (
    <ButtonGroup aria-label="Actions">
      <ButtonGroupText>Actions</ButtonGroupText>
      <ButtonGroupSeparator />
      <Button variant="outline">Edit</Button>
      <Button variant="outline">View</Button>
      <Button variant="outline">Share</Button>
    </ButtonGroup>
  ),
};
