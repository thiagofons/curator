import type { Meta, StoryObj } from "@storybook/react";
import { LanguageSwitcher } from "./LanguageSwitcher";

const meta = {
  title: "Components/LanguageSwitcher",
  component: LanguageSwitcher,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof LanguageSwitcher>;

export default meta;
type Story = StoryObj<typeof meta>;

export const OnHomePage: Story = {
  args: {
    initialPath: "/",
  },
};

export const OnAboutPagePT: Story = {
  args: {
    initialPath: "/sobre",
  },
};

export const OnAboutPageEN: Story = {
  args: {
    initialPath: "/en/about",
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

export const OnBlogPagePT: Story = {
  args: {
    initialPath: "/blog",
  },
};

export const OnBlogPageEN: Story = {
  args: {
    initialPath: "/en/blog",
  },
};
