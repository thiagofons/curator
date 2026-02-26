import {
  Button,
  type ButtonProps,
} from "@repo/ui-web/components/base/button.jsx";
import * as React from "react";

interface CTAButtonProps extends ButtonProps {
  href: string;
  children: React.ReactNode;
}

export function CTAButton({
  href,
  children,
  size = "cta",
  ...props
}: CTAButtonProps) {
  return (
    <Button asChild size={size} {...props}>
      <a href={href}>{children}</a>
    </Button>
  );
}
