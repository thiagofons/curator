import type { Meta, StoryObj } from "@storybook/react";

import { Bold } from "lucide-react";

import { Toggle } from "./toggle";

const meta: Meta<typeof Toggle> = {
  title: "Components/Base/Toggle",
  component: Toggle,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Toggle>;

export const Default: Story = {
  render: () => (
    <Toggle aria-label="Toggle bold" pressed={true}>
      <Bold className="size-4" />
    </Toggle>
  ),
};
