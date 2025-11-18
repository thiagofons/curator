import type { Meta, StoryObj } from "@storybook/react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";

const meta: Meta<typeof Table> = {
  title: "Components/Base/Table",
  component: Table,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Table>;

export const Default: Story = {
  render: () => (
    <Table className="w-[420px]">
      <TableCaption>A list of recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[140px]">Invoice</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>#0001</TableCell>
          <TableCell>Acme Inc.</TableCell>
          <TableCell className="text-right">$1,200.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>#0002</TableCell>
          <TableCell>Globex Corp.</TableCell>
          <TableCell className="text-right">$980.00</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};
