import type { Meta, StoryObj } from "@storybook/react";

import { useState } from "react";
import { toast } from "sonner";

import { Button } from "./button";
import { Toaster } from "./sonner";

const meta: Meta<typeof Toaster> = {
  title: "Components/Base/Toaster",
  component: Toaster,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Toaster>;

const ToasterExample = () => {
  const [count, setCount] = useState(1);

  return (
    <>
      <Button
        onClick={() => {
          toast.success(`Notification ${count}`);
          setCount((prev) => prev + 1);
        }}
      >
        Show toast
      </Button>
      <Toaster />
    </>
  );
};

export const Default: Story = {
  render: () => <ToasterExample />,
};
