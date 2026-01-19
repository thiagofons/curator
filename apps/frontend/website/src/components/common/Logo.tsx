import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@repo/ui-web/lib/utils";

import LogoDark from "@/assets/images/logo-dark.png";
import LogoLight from "@/assets/images/logo-light.png";

import LogoProDark from "@/assets/images/logo-pro-dark.png";
import LogoProLight from "@/assets/images/logo-pro-light.png";

const logoVariants = cva("w-auto", {
  variants: {
    size: {
      xs: "h-3 sm:h-4",
      sm: "h-4 sm:h-6",
      md: "h-6 sm:h-8",
      lg: "h-8 sm:h-10",
      xl: "h-10 sm:h-12",
      "2xl": "h-12 sm:h-16",
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
  const image = type === "light" ? LogoLight : LogoDark;

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <img
        src={image.src}
        alt="Curator"
        loading="lazy"
        className={logoVariants({ size })}
        draggable="false"
      />
    </div>
  );
};
export const LogoPro = ({ className, type = "light", size }: LogoProps) => {
  const image = type === "light" ? LogoProLight : LogoProDark;

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <img
        src={image.src}
        alt="Curator"
        loading="lazy"
        className={logoVariants({ size })}
        draggable="false"
      />
    </div>
  );
};
