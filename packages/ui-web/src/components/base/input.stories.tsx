import type { Meta, StoryObj } from "@storybook/react";

import { Input } from "./input";

const meta: Meta<typeof Input> = {
  title: "Components/Base/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: "Type something...",
  },
};
