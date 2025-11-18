import type { Meta, StoryObj } from "@storybook/react";

import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemGroup,
  ItemHeader,
  ItemMedia,
  ItemTitle,
} from "./item";
import { Button } from "./button";
import { FileText } from "lucide-react";

const meta: Meta<typeof ItemGroup> = {
  title: "Components/Base/Item",
  component: ItemGroup,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ItemGroup>;

export const Default: Story = {
  render: () => (
    <ItemGroup className="w-[420px]">
      <Item>
        <ItemMedia variant="icon">
          <FileText className="size-4" />
        </ItemMedia>
        <ItemContent>
          <ItemHeader>
            <ItemTitle>Quarterly report</ItemTitle>
            <ItemActions>
              <Button size="sm" variant="outline">
                View
              </Button>
              <Button size="sm">Download</Button>
            </ItemActions>
          </ItemHeader>
          <ItemDescription>
            A summary of your team&apos;s performance this quarter.
          </ItemDescription>
          <ItemFooter>
            <span className="text-muted-foreground text-xs">
              Updated 2 days ago
            </span>
          </ItemFooter>
        </ItemContent>
      </Item>
    </ItemGroup>
  ),
};
