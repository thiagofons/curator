import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "./button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./hover-card";

const meta: Meta<typeof HoverCard> = {
  title: "Components/Base/HoverCard",
  component: HoverCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof HoverCard>;

export const Default: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild={true}>
        <Button variant="link">Hover me</Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-64">
        <p className="text-sm font-medium">Hover card title</p>
        <p className="text-muted-foreground text-sm">
          Use hover cards to display contextual information when hovering an
          element.
        </p>
      </HoverCardContent>
    </HoverCard>
  ),
};
