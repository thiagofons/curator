import type { Meta, StoryObj } from "@storybook/react";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./resizable";

const meta: Meta<typeof ResizablePanelGroup> = {
  title: "Components/Base/Resizable",
  component: ResizablePanelGroup,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ResizablePanelGroup>;

export const Default: Story = {
  render: () => (
    <ResizablePanelGroup
      className="h-40 w-[420px] rounded-md border"
      direction="horizontal"
    >
      <ResizablePanel defaultSize={50}>
        <div className="flex h-full items-center justify-center text-sm">
          Panel 1
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel>
        <div className="flex h-full items-center justify-center text-sm">
          Panel 2
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
};
