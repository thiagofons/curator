import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { motion } from "framer-motion"; // Importando tipos corretos
import * as React from "react";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "font-medium inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 text-btn-text transform-gpu",
  {
    variants: {
      variant: {
        default: "bg-primary text-white hover:bg-primary/90 shadow-sm",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-4 py-2",
        sm: "h-9 rounded-md px-4 text-xs",
        lg: "h-14 rounded-md px-4",
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

    // O 'as any' continua necessário para compatibilidade de tipos entre Radix e Framer
    const MotionComponent = motion(BaseComponent) as any;

    const tapAnimation = disableAnimation
      ? {}
      : {
          scale: 0.96,
          transition: {
            ease: [0.32, 0.72, 0, 1],
            duration: 0.15,
          },
        };

    return (
      <MotionComponent
        ref={ref}
        // CRUCIAL: layout={false} impede que o Framer tente corrigir o texto
        // e cause o efeito de "deslizamento" ou achatamento.
        layout={false}
        whileTap={tapAnimation}
        className={cn(buttonVariants({ variant, size, className }))}
        // ESTILOS DE CORREÇÃO DE RENDERIZAÇÃO
        style={{
          // Força o navegador a rasterizar o elemento antes de animar
          transform: "translateZ(0)",
          backfaceVisibility: "hidden",
          WebkitFontSmoothing: "subpixel-antialiased",
          // Garante que a escala aconteça a partir do centro exato
          transformOrigin: "center center",
        }}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
