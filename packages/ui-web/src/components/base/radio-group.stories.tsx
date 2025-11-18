import type { Meta, StoryObj } from "@storybook/react";

import { Label } from "./label";
import { RadioGroup, RadioGroupItem } from "./radio-group";

const meta: Meta<typeof RadioGroup> = {
  title: "Components/Base/RadioGroup",
  component: RadioGroup,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {
  render: () => (
    <RadioGroup className="flex flex-col gap-2" defaultValue="option-1">
      <div className="flex items-center gap-2">
        <RadioGroupItem id="option-1" value="option-1" />
        <Label htmlFor="option-1">Option 1</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem id="option-2" value="option-2" />
        <Label htmlFor="option-2">Option 2</Label>
      </div>
    </RadioGroup>
  ),
};
