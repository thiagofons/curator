import type { Meta, StoryObj } from "@storybook/react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./collapsible";
import { Button } from "./button";

const meta: Meta<typeof Collapsible> = {
  title: "Components/Base/Collapsible",
  component: Collapsible,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Collapsible>;

export const Default: Story = {
  render: () => (
    <Collapsible className="w-[320px] space-y-2">
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm font-medium">Collapsible section</span>
        <CollapsibleTrigger asChild={true}>
          <Button size="sm" variant="outline">
            Toggle
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="text-muted-foreground space-y-2 text-sm">
        <p>
          Use collapsible to show and hide content that is not always needed.
        </p>
      </CollapsibleContent>
    </Collapsible>
  ),
};
