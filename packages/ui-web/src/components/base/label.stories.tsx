import type { Meta, StoryObj } from "@storybook/react";

import { Label } from "./label";
import { Input } from "./input";

const meta: Meta<typeof Label> = {
  title: "Components/Base/Label",
  component: Label,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Label>;

export const Default: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Label htmlFor="email">Email</Label>
      <Input id="email" placeholder="you@example.com" type="email" />
    </div>
  ),
};
