import type { Meta, StoryObj } from "@storybook/react";

import { Switch } from "./switch";

const meta: Meta<typeof Switch> = {
  title: "Components/Base/Switch",
  component: Switch,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  args: {
    checked: true,
  },
};
