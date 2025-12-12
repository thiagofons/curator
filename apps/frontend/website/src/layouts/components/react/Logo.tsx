/* eslint-disable @next/next/no-img-element */
import * as React from "react";

export const Logo = ({
  className = "",
  type = "light",
}: {
  className?: string;
  type?: "dark" | "light";
}) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {type === "light" ? (
        <img
          src="/images/logo-light.png"
          alt="Curator"
          loading="lazy"
          className="h-8 w-auto"
          draggable="false"
        />
      ) : (
        <img
          src="/images/logo-dark.png"
          alt="Curator"
          loading="lazy"
          className="h-8 w-auto"
          draggable="false"
        />
      )}
    </div>
  );
};
