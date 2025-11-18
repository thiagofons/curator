import type { Meta, StoryObj } from "@storybook/react";

import { Bold, Italic, Underline } from "lucide-react";

import { ToggleGroup, ToggleGroupItem } from "./toggle-group";

const meta: Meta<typeof ToggleGroup> = {
  title: "Components/Base/ToggleGroup",
  component: ToggleGroup,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ToggleGroup>;

export const Default: Story = {
  render: () => (
    <ToggleGroup type="multiple">
      <ToggleGroupItem aria-label="Bold" value="bold">
        <Bold className="size-4" />
      </ToggleGroupItem>
      <ToggleGroupItem aria-label="Italic" value="italic">
        <Italic className="size-4" />
      </ToggleGroupItem>
      <ToggleGroupItem aria-label="Underline" value="underline">
        <Underline className="size-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
};
