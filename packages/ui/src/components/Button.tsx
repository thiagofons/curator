import { cva, type VariantProps } from "class-variance-authority";
import React from "react";
import { Pressable, Text, type PressableProps } from "react-native";
import { cn } from "../lib/utils";

const buttonVariants = cva(
  "flex-row items-center justify-center rounded-md font-medium transition-colors disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary shadow-sm hover:bg-primary/90 active:bg-primary/80",
        destructive:
          "bg-destructive shadow-sm hover:bg-destructive/90 active:bg-destructive/80",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground active:bg-accent/80",
        secondary:
          "bg-secondary shadow-sm hover:bg-secondary/80 active:bg-secondary/70",
        ghost:
          "hover:bg-accent hover:text-accent-foreground active:bg-accent/80",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-6 py-3",
        sm: "h-9 rounded-md px-3",
        lg: "h-12 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const buttonTextVariants = cva("font-medium text-base", {
  variants: {
    variant: {
      default: "text-primary-foreground",
      destructive: "text-destructive-foreground",
      outline: "text-foreground",
      secondary: "text-secondary-foreground",
      ghost: "text-foreground",
      link: "text-primary",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface ButtonProps
  extends PressableProps,
    VariantProps<typeof buttonVariants> {
  label?: string;
  children?: React.ReactNode;
  className?: string; // Add className explicitly
}

export const Button = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  ButtonProps
>(({ className, variant, size, label, children, ...props }, ref) => {
  return (
    <Pressable
      ref={ref}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {label ? (
        <Text className={cn(buttonTextVariants({ variant }))}>{label}</Text>
      ) : (
        children
      )}
    </Pressable>
  );
});

Button.displayName = "Button";
