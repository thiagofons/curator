import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "./button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: [
        "default",
        "destructive",
        "outline",
        "secondary",
        "ghost",
        "link",
      ],
      description: "The visual style of the button.",
    },
    size: {
      control: { type: "select" },
      options: ["default", "sm", "lg", "icon"],
      description: "The size of the button.",
    },
    asChild: {
      control: "boolean",
      description:
        "Renders the button as a child of another component, typically a slot.",
    },
    className: {
      control: "text",
      description: "Additional CSS classes to apply to the button.",
    },
    children: {
      control: "text",
      description: "The content of the button.",
    },
    // Você pode adicionar mais controles para outras props HTML se desejar
    onClick: { action: "clicked" }, // Mostra um log no painel Actions quando clicado
  },
  args: {
    // Valores padrão para os controles, se não forem especificados em uma story
    children: "Button",
    variant: "default",
    size: "default",
    color: "yellow",
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

/*
 * Definindo as diferentes variações (stories) do seu botão.
 * Cada story representa um estado ou caso de uso diferente do componente.
 */

export const Default: Story = {
  args: {
    children: "Default Button",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Outline Button",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Secondary Button",
  },
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
    children: "Destructive Button",
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
    children: "Ghost Button",
  },
};

export const Link: Story = {
  args: {
    variant: "link",
    children: "Link Button",
  },
};

export const Small: Story = {
  args: {
    size: "sm",
    children: "Small Button",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    children: "Large Button",
  },
};

export const Icon: Story = {
  args: {
    size: "icon",
    children: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-4"
      >
        <title>Plus</title>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 4.5v15m7.5-7.5h-15"
        />
      </svg>
    ),
  },
};

export const WithCustomColor: Story = {
  args: {
    children: "Yellow Button",
    color: "yellow",
  },
};

export const WithIcon: Story = {
  args: {
    children: (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-4"
        >
          <title>Plus</title>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
        Add Item
      </>
    ),
  },
};

export const Disabled: Story = {
  args: {
    children: "Disabled Button",
    disabled: true,
  },
};

// Exemplo usando asChild (requer um componente pai que aceite 'asChild')
// Para este exemplo ser funcional no Storybook, precisaríamos de um 'Slot'
// ou um componente Link fictício que aceite a prop 'asChild'.
// Por simplicidade, vamos mostrar a estrutura, mas o render interativo pode não ser o esperado
// sem um "pai" real que receba o slot.
export const AsChild: Story = {
  args: {
    children: <a href="https://planefica.com">Link (asChild)</a>,
    asChild: true,
  },
};
