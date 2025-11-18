import type { Meta, StoryObj } from "@storybook/react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
} from "./input-group";
import { Search } from "lucide-react";

const meta: Meta<typeof InputGroup> = {
  title: "Components/Base/InputGroup",
  component: InputGroup,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof InputGroup>;

export const Default: Story = {
  render: () => (
    <InputGroup className="w-[360px]">
      <InputGroupAddon>
        <Search className="size-4" />
      </InputGroupAddon>
      <InputGroupInput placeholder="Search..." />
      <InputGroupAddon align="inline-end">
        <InputGroupText>⌘K</InputGroupText>
        <InputGroupButton>Go</InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  ),
};
