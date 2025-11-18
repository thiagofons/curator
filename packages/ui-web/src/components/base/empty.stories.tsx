import type { Meta, StoryObj } from "@storybook/react";

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "./empty";
import { Button } from "./button";
import { Inbox } from "lucide-react";

const meta: Meta<typeof Empty> = {
  title: "Components/Base/Empty",
  component: Empty,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Empty>;

export const Default: Story = {
  render: () => (
    <Empty className="w-[360px]">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Inbox className="size-6" />
        </EmptyMedia>
        <EmptyTitle>No items found</EmptyTitle>
        <EmptyDescription>
          Get started by creating a new item. It only takes a minute.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button>New item</Button>
      </EmptyContent>
    </Empty>
  ),
};
