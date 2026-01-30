import { Button } from "@repo/ui-web/components/base/button.jsx";
import * as React from "react";

interface CTAButtonProps {
  href: string;
  children: React.ReactNode;
}

export function CTAButton({ href, children }: CTAButtonProps) {
  return (
    <Button asChild>
      <a href={href}>{children}</a>
    </Button>
  );
}
