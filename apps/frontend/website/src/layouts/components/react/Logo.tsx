/* eslint-disable @next/next/no-img-element */
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@repo/ui-web/lib/utils";

const logoVariants = cva("w-auto", {
  variants: {
    size: {
      xs: "h-4",
      sm: "h-6",
      md: "h-8",
      lg: "h-10",
      xl: "h-12",
      "2xl": "h-16",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export interface LogoProps extends VariantProps<typeof logoVariants> {
  className?: string;
  type?: "dark" | "light";
}

export const Logo = ({ className, type = "light", size }: LogoProps) => {
  const src =
    type === "light" ? "/images/logo-light.png" : "/images/logo-dark.png";

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <img
        src={src}
        alt="Curator"
        loading="lazy"
        className={logoVariants({ size })}
        draggable="false"
      />
    </div>
  );
};
