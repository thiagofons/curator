import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "./button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./drawer";

const meta: Meta<typeof Drawer> = {
  title: "Components/Base/Drawer",
  component: Drawer,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Drawer>;

export const Default: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild={true}>
        <Button>Open drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Drawer title</DrawerTitle>
          <DrawerDescription>
            Use drawers for supplementary content like filters or details.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <Button>Confirm</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
};
