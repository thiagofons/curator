import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { motion } from "framer-motion";
import * as React from "react";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "font-medium inline-flex items-center justify-center gap-2 whitespace-normal rounded-full ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 text-btn-text text-sm sm:text-base overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-primary text-white hover:bg-primary/90 shadow-sm",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent ",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-4 py-2",
        sm: "h-9 px-4 text-xs",
        md: "h-18 px-6 py-3",
        lg: "h-14 px-4",
        cta: "h-14 px-10 py-4 text-base font-semibold tracking-wide",
        full: "h-11 min-w-full px-4 py-2",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  disableAnimation?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      disableAnimation = false,
      ...props
    },
    ref,
  ) => {
    const BaseComponent = asChild ? Slot : "button";
    const MotionComponent = motion.create(BaseComponent) as any;

    return (
      <MotionComponent
        ref={ref}
        layout={false}
        whileTap={
          disableAnimation
            ? {}
            : {
                scale: 0.95,

                transition: {
                  duration: 0.2,
                  ease: "easeOut",
                },
              }
        }
        className={cn(buttonVariants({ variant, size, className }))}
        style={{
          transformOrigin: "center center",
        }}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
