import { cva, type VariantProps } from "class-variance-authority";
import React, { type ElementType } from "react";

import { themeColorClasses, type ThemeColor } from "../../types/theme-colors";

// ----------------------------------------------------------------------
// Typography Variants Definition (CVA) - Visual Contract
// ----------------------------------------------------------------------

/**
 * Typography style variants using Class Variance Authority (CVA).
 * Defines the visual contract for all text elements in the design system.
 *
 * @remarks
 * - Base color: `text-slate-900`
 * - Variants follow the design token hierarchy: Display → Heading → Subheading → Body → Button
 * - Each variant maps to design tokens defined in Tailwind configuration
 *
 * @see {@link https://cva.style/docs | CVA Documentation}
 */
const typographyVariants = cva(
  "", // Removed base color - now controlled by `color` prop
  {
    variants: {
      variant: {
        // --- Display ---
        /** Large display heading - typically for hero sections */
        "display-h1": "text-display-h1 font-medium tracking-tight",

        // --- Heading ---
        /** Secondary heading - major page sections */
        "heading-h2": "text-heading-h2 font-medium tracking-tight",
        /** Tertiary heading - subsections */
        "heading-h3": "text-heading-h3 font-medium",
        /** Quaternary heading - minor subsections */
        "heading-h4": "text-heading-h4 font-medium",

        // --- Subheading ---
        /** Extra large subheading - prominent descriptive text */
        "subheading-xl": "text-subheading-xl font-normal",
        /** Large subheading - descriptive text */
        "subheading-lg": "text-subheading-lg font-normal",
        /** Medium subheading - standard descriptive text */
        "subheading-md": "text-subheading-md font-normal",
        /** Small subheading - labels and tags (uppercase) */
        "subheading-sm": "text-subheading-sm font-normal tracking-wide",
        /** Extra small subheading - micro labels (uppercase) */
        "subheading-xs": "text-subheading-xs font-normal tracking-wide",

        // --- Body ---
        /** Large body text - emphasized paragraphs */
        "body-large": "text-body-large font-normal",
        /** Base body text - standard paragraphs */
        "body-base": "text-body-base font-normal",
        /** Small body text - secondary information */
        "body-small": "text-body-small font-normal",

        // --- Button ---
        /** Button text styling - uppercase with tracking */
        "btn-text": "text-btn-text font-semibold tracking-wide",
      },
    },
    defaultVariants: {
      variant: "body-base",
    },
  },
);

// ----------------------------------------------------------------------
// Base Polymorphic Component
// ----------------------------------------------------------------------

/**
 * Props for the Typography component.
 *
 * @remarks
 * Extends native HTML element attributes while adding polymorphic behavior
 * through the `as` prop and style variants through CVA.
 *
 * @typeParam T - The HTML element type (inferred from `as` prop)
 */
export interface TypographyProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof typographyVariants> {
  /**
   * The HTML element to render. Enables polymorphic behavior.
   *
   * @defaultValue 'p'
   * @example
   * ```tsx
   * <Typography as="h1" variant="display-h1">Title</Typography>
   * <Typography as="span" variant="body-base">Text</Typography>
   * ```
   */
  as?: ElementType;

  /** Content to be rendered inside the typography element */
  children?: React.ReactNode;

  /**
   * Theme color to apply to the text.
   * Supports semantic colors (theme-aware) and primitive colors (fixed).
   *
   * @defaultValue 'foreground'
   * @example
   * ```tsx
   * <Typography color="primary">Primary colored text</Typography>
   * <Typography color="brand-blue">Brand blue text</Typography>
   * <Typography color="muted-foreground">Muted text</Typography>
   * ```
   */
  color?: ThemeColor;
}

/**
 * Base Typography component with polymorphic rendering and variant styling.
 *
 * @remarks
 * This is the foundational component. For better DX, use semantic wrapper
 * components (Display, H2, H3, etc.) instead of using this directly.
 *
 * @example
 * ```tsx
 * // Direct usage (flexible but verbose)
 * <Typography variant="heading-h2" as="h2">Section Title</Typography>
 *
 * // Preferred: Use semantic wrappers
 * <H2>Section Title</H2>
 * ```
 *
 * @param props - Component props
 * @returns Rendered typography element
 */
export const Typography = ({
  variant,
  as,
  children,
  color = "black",
  ...props
}: TypographyProps) => {
  const Component = as || "p";
  const colorClass = themeColorClasses[color];

  return (
    <Component
      {...props}
      className={`${typographyVariants({ variant })} ${colorClass}`}
    >
      {children}
    </Component>
  );
};

// ----------------------------------------------------------------------
// Semantic Wrapper Components (DX Shortcuts)
// Pattern: Fixed Visual Style + Suggested Semantic Tag (overridable)
// ----------------------------------------------------------------------

// --- DISPLAY & HEADINGS ---

/**
 * Display heading component for hero sections and prominent titles.
 *
 * @remarks
 * - Visual: `display-h1` variant
 * - Semantic default: `<h1>`
 * - Override semantic tag via `as` prop if needed for SEO/a11y
 *
 * @example
 * ```tsx
 * <Display>Welcome to Curator</Display>
 * <Display as="div">Non-semantic display text</Display>
 * ```
 */
export const Display = ({
  as = "h1",
  color = "foreground",
  ...props
}: TypographyProps) => {
  return <Typography variant="display-h1" as={as} color={color} {...props} />;
};

/**
 * Secondary heading component for major page sections.
 *
 * @remarks
 * - Visual: `heading-h2` variant
 * - Semantic default: `<h2>`
 */
export const H2 = ({
  as = "h2",
  color = "foreground",
  ...props
}: TypographyProps) => (
  <Typography variant="heading-h2" as={as} color={color} {...props} />
);

/**
 * Tertiary heading component for subsections.
 *
 * @remarks
 * - Visual: `heading-h3` variant
 * - Semantic default: `<h3>`
 */
export const H3 = ({
  as = "h3",
  color = "foreground",
  ...props
}: TypographyProps) => (
  <Typography variant="heading-h3" as={as} color={color} {...props} />
);

/**
 * Quaternary heading component for minor subsections.
 *
 * @remarks
 * - Visual: `heading-h4` variant
 * - Semantic default: `<h4>`
 */
export const H4 = ({
  as = "h4",
  color = "foreground",
  ...props
}: TypographyProps) => (
  <Typography variant="heading-h4" as={as} color={color} {...props} />
);

// --- SUBHEADINGS ---

/**
 * Extra large subheading for prominent descriptive text.
 *
 * @remarks
 * - Visual: `subheading-xl` variant
 * - Semantic default: `<p>` (avoids polluting document outline)
 * - Use `as="h5"` if SEO hierarchy requires it
 */
export const SubheadingXL = ({
  as = "p",
  color = "secondary",
  ...props
}: TypographyProps) => (
  <Typography variant="subheading-xl" as={as} color={color} {...props} />
);

/**
 * Large subheading for descriptive text.
 *
 * @remarks
 * - Visual: `subheading-lg` variant
 * - Semantic default: `<p>`
 */
export const SubheadingLG = ({
  as = "p",
  color = "foreground",
  ...props
}: TypographyProps) => (
  <Typography variant="subheading-lg" as={as} color={color} {...props} />
);

/**
 * Medium subheading for standard descriptive text.
 *
 * @remarks
 * - Visual: `subheading-md` variant
 * - Semantic default: `<p>`
 */
export const SubheadingMD = ({
  as = "p",
  color = "foreground",
  ...props
}: TypographyProps) => (
  <Typography variant="subheading-md" as={as} color={color} {...props} />
);

/**
 * Small subheading for labels and tags.
 *
 * @remarks
 * - Visual: `subheading-sm` variant (uppercase with tracking)
 * - Semantic default: `<span>` (inline usage)
 */
export const SubheadingSM = ({
  as = "span",
  color = "foreground",
  ...props
}: TypographyProps) => (
  <Typography variant="subheading-sm" as={as} color={color} {...props} />
);

/**
 * Extra small subheading for micro labels.
 *
 * @remarks
 * - Visual: `subheading-xs` variant (uppercase with tracking)
 * - Semantic default: `<span>` (inline usage)
 */
export const SubheadingXS = ({
  as = "span",
  color = "foreground",
  ...props
}: TypographyProps) => (
  <Typography variant="subheading-xs" as={as} color={color} {...props} />
);

// --- BODY ---

/**
 * Large body text for emphasized paragraphs.
 *
 * @remarks
 * - Visual: `body-large` variant
 * - Semantic default: `<p>`
 */
export const BodyLarge = ({
  as = "p",
  color = "foreground",
  ...props
}: TypographyProps) => (
  <Typography variant="body-large" as={as} color={color} {...props} />
);

/**
 * Base body text for standard paragraphs.
 *
 * @remarks
 * - Visual: `body-base` variant (default)
 * - Semantic default: `<p>`
 */
export const BodyBase = ({
  as = "p",
  color = "foreground",
  ...props
}: TypographyProps) => (
  <Typography variant="body-base" as={as} color={color} {...props} />
);

/**
 * Small body text for secondary information.
 *
 * @remarks
 * - Visual: `body-small` variant
 * - Semantic default: `<p>`
 */
export const BodySmall = ({
  as = "p",
  color = "foreground",
  ...props
}: TypographyProps) => (
  <Typography variant="body-small" as={as} color={color} {...props} />
);

// --- BUTTON TEXT ---

/**
 * Button text styling component.
 *
 * @remarks
 * - Visual: `btn-text` variant (uppercase, semibold, tracking)
 * - Semantic default: `<span>` (used inside button elements)
 * - Typically used within Button components, not standalone
 *
 * @example
 * ```tsx
 * <button>
 *   <ButtonText>Click Me</ButtonText>
 * </button>
 * ```
 */
export const ButtonText = ({
  as = "span",
  color = "foreground",
  ...props
}: TypographyProps) => (
  <Typography variant="btn-text" as={as} color={color} {...props} />
);
