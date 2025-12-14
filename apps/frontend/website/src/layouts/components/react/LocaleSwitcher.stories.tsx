import type { Meta, StoryObj } from "@storybook/react";
import { LocaleSwitcher } from "./LocaleSwitcher";

const meta: Meta<typeof LocaleSwitcher> = {
  title: "Website/Components/LocaleSwitcher",
  component: LocaleSwitcher,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    initialPath: {
      control: "text",
      description: "O pathname inicial para determinar o locale atual",
    },
    className: {
      control: "text",
      description: "Classes CSS adicionais",
    },
  },
} satisfies Meta<typeof LocaleSwitcher>;

export default meta;
type Story = StoryObj<typeof meta>;

export const OnHomePagePT: Story = {
  args: {
    initialPath: "/",
  },
  parameters: {
    docs: {
      description: {
        story: "LocaleSwitcher na página inicial (português)",
      },
    },
  },
};

export const OnHomePageEN: Story = {
  args: {
    initialPath: "/en",
  },
  parameters: {
    docs: {
      description: {
        story: "LocaleSwitcher na página inicial (inglês)",
      },
    },
  },
};

export const OnAboutPagePT: Story = {
  args: {
    initialPath: "/sobre",
  },
  parameters: {
    docs: {
      description: {
        story: 'LocaleSwitcher na página "Sobre" (português)',
      },
    },
  },
};

export const OnAboutPageEN: Story = {
  args: {
    initialPath: "/en/about",
  },
  parameters: {
    docs: {
      description: {
        story: 'LocaleSwitcher na página "About" (inglês)',
      },
    },
  },
};

export const OnRoadmapsPagePT: Story = {
  args: {
    initialPath: "/trilhas",
  },
};

export const OnRoadmapsPageEN: Story = {
  args: {
    initialPath: "/en/roadmaps",
  },
};

export const WithCustomClassName: Story = {
  args: {
    initialPath: "/",
    className: "border-2 border-primary rounded-lg",
  },
  parameters: {
    docs: {
      description: {
        story: "LocaleSwitcher com classes personalizadas aplicadas",
      },
    },
  },
};
