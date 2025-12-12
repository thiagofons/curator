import { Display, SubheadingXL } from "@repo/ui-web/custom/typography";
import { cn } from "@repo/ui-web/lib/utils";
import * as React from "react";
type Orientation = "horizontal" | "vertical";

type RootProps = React.HTMLAttributes<HTMLDivElement> & {
  orientation?: Orientation;
  imageSide?: "left" | "right"; // apenas para horizontal
  containerClassName?: string;
};

const Root = ({
  orientation = "horizontal",
  imageSide = "right",
  className,
  containerClassName,
  children,
  ...props
}: RootProps) => {
  const isHorizontal = orientation === "horizontal";

  return (
    <div
      className={cn(
        "bg-card text-card-foreground mt-24 min-h-24 w-full max-w-[1200px] rounded-3xl text-center shadow-sm md:mt-0 md:text-left",
        "border-border border",
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          "grid gap-8 p-10 md:gap-12 md:p-10",
          isHorizontal ? "items-center md:grid-cols-2" : "grid-cols-1",
          containerClassName,
        )}
      >
        {children}
      </div>
    </div>
  );
};

const Content = ({
  className,
  ...props
}: React.ImgHTMLAttributes<HTMLImageElement>) => (
  <div
    className={cn(
      "flex h-auto w-full flex-col gap-[18px] rounded-2xl object-cover",
      className,
    )}
    {...props}
  />
);

const Image = ({
  className,
  ...props
}: React.ImgHTMLAttributes<HTMLImageElement>) => (
  <img
    draggable="false"
    className={cn("h-auto w-full object-cover", className)}
    {...props}
  />
);

const Title = ({
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => (
  <Display {...props}>{children}</Display>
);

const Subtitle = ({
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) => (
  <SubheadingXL {...props}>{children}</SubheadingXL>
);

const Actions = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex items-center justify-center gap-4 md:justify-start",
      className,
    )}
    {...props}
  >
    {children}
  </div>
);

// // Renderizadores de slots conforme orientação
// const ContentSlot = ({ vertical = false }: { vertical?: boolean }) => {
//   return (
//     <div
//       className={cn(
//         "flex flex-col border border-red-500",
//         vertical ? "items-center text-center" : "items-start",
//       )}
//     >
//       {Title}
//       <div className="mt-4">{Subtitle}</div>
//       <div className="mt-6">{Actions}</div>
//     </div>
//   );
// };

// const ImageSlot = ({ vertical = false }: { vertical?: boolean }) => {
//   const { Image } = React.useContext(SlotsContext);
//   if (!Image) return null;
//   return (
//     <div
//       className={cn(
//         vertical ? "order-last" : "",
//         "flex justify-center md:justify-end",
//       )}
//     >
//       {Image}
//     </div>
//   );
// };

// Wrapper para coletar conteúdo antes do Root renderizar slots
const HeroCardRoot = (props: RootProps & { children: React.ReactNode }) => {
  return <Root {...props}>{props.children}</Root>;
};

export const HeroCard = {
  Root: HeroCardRoot,
  Content,
  Image,
  Title,
  Subtitle,
  Actions,
};
