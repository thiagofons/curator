import type { Meta, StoryObj } from "@storybook/react";

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
  FieldTitle,
} from "./field";
import { Checkbox } from "./checkbox";

const meta: Meta<typeof FieldSet> = {
  title: "Components/Base/Field",
  component: FieldSet,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof FieldSet>;

export const Default: Story = {
  render: () => (
    <FieldSet className="w-[360px]">
      <FieldGroup>
        <Field orientation="horizontal">
          <FieldLabel>
            <FieldTitle>Enable notifications</FieldTitle>
            <FieldDescription>
              Receive updates about new activity and features.
            </FieldDescription>
          </FieldLabel>
          <FieldContent>
            <Checkbox aria-label="Enable notifications" checked={true} />
          </FieldContent>
        </Field>
      </FieldGroup>
    </FieldSet>
  ),
};
