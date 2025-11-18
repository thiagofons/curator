import type { Meta, StoryObj } from "@storybook/react";

import { Separator } from "./separator";

const meta: Meta<typeof Separator> = {
  title: "Components/Base/Separator",
  component: Separator,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Separator>;

export const Default: Story = {
  render: () => (
    <div className="w-[240px] space-y-2 text-sm">
      <div>Above the separator</div>
      <Separator />
      <div>Below the separator</div>
    </div>
  ),
};
