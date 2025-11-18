import type { Meta, StoryObj } from "@storybook/react";

import { Calendar } from "./calendar";

const meta: Meta<typeof Calendar> = {
  title: "Components/Base/Calendar",
  component: Calendar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Calendar>;

export const Default: Story = {
  render: () => (
    <Calendar
      captionLayout="dropdown-buttons"
      mode="single"
      selected={new Date()}
      showOutsideDays={true}
    />
  ),
};
