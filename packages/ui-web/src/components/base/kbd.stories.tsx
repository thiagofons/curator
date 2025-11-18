import type { Meta, StoryObj } from "@storybook/react";

import { Kbd, KbdGroup } from "./kbd";

const meta: Meta<typeof Kbd> = {
  title: "Components/Base/Kbd",
  component: Kbd,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Kbd>;

export const Default: Story = {
  render: () => (
    <KbdGroup>
      <Kbd>⌘</Kbd>
      <Kbd>K</Kbd>
    </KbdGroup>
  ),
};
