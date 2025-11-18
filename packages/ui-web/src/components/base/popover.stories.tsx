import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "./button";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

const meta: Meta<typeof Popover> = {
  title: "Components/Base/Popover",
  component: Popover,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Popover>;

export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild={true}>
        <Button variant="outline">Open popover</Button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <p className="text-sm font-medium">Popover title</p>
        <p className="text-muted-foreground text-sm">
          Popovers are perfect for rich contextual content.
        </p>
      </PopoverContent>
    </Popover>
  ),
};
