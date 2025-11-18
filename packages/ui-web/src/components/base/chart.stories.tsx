import type { Meta, StoryObj } from "@storybook/react";

import {
  ChartContainer,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "./chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

const meta: Meta<typeof ChartContainer> = {
  title: "Components/Base/Chart",
  component: ChartContainer,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ChartContainer>;

const data = [
  { month: "Jan", value: 120 },
  { month: "Feb", value: 90 },
  { month: "Mar", value: 150 },
  { month: "Apr", value: 80 },
];

export const Default: Story = {
  render: () => (
    <ChartContainer
      className="h-64 w-[420px]"
      config={{
        value: {
          label: "Revenue",
          color: "hsl(var(--chart-1))",
        },
      }}
    >
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="month" />
        <YAxis />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegendContent />
        <Bar dataKey="value" fill="var(--color-value)" radius={4} />
      </BarChart>
    </ChartContainer>
  ),
};
