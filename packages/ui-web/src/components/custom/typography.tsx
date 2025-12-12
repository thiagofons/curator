import { cva, type VariantProps } from "class-variance-authority";
import React, { type ElementType } from "react";
import { cn } from "../../lib/utils";

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
  "text-slate-900", // Base default color
  {
    variants: {
      variant: {
        // --- Display ---
        /** Large display heading - typically for hero sections */
        "display-h1": "text-display-h1 font-medium tracking-tight text-black",

        // --- Heading ---
        /** Secondary heading - major page sections */
        "heading-h2": "text-heading-h2 font-semibold tracking-tight",
        /** Tertiary heading - subsections */
        "heading-h3": "text-heading-h3 font-medium",
        /** Quaternary heading - minor subsections */
        "heading-h4": "text-heading-h4 font-medium",

        // --- Subheading ---
        /** Extra large subheading - prominent descriptive text */
        "subheading-xl": "text-subheading-xl font-medium text-secondary",
        /** Large subheading - descriptive text */
        "subheading-lg": "text-subheading-lg font-medium",
        /** Medium subheading - standard descriptive text */
        "subheading-md": "text-subheading-md font-medium text-secondary",
        /** Small subheading - labels and tags (uppercase) */
        "subheading-sm":
          "text-subheading-sm font-medium uppercase tracking-wide",
        /** Extra small subheading - micro labels (uppercase) */
        "subheading-xs":
          "text-subheading-xs font-medium uppercase tracking-wide",

        // --- Body ---
        /** Large body text - emphasized paragraphs */
        "body-large": "text-body-large font-normal",
        /** Base body text - standard paragraphs */
        "body-base": "text-body-base font-normal",
        /** Small body text - secondary information */
        "body-small": "text-body-small font-normal",

        // --- Button ---
        /** Button text styling - uppercase with tracking */
        "btn-text": "text-btn-text font-semibold uppercase tracking-wide",
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
  children: React.ReactNode;
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
  className,
  children,
  ...props
}: TypographyProps) => {
  const Component = as || "p"; // Safe fallback to paragraph

  return (
    <Component
      className={cn(typographyVariants({ variant, className }))}
      {...props}
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
export const Display = ({ as = "h1", ...props }: TypographyProps) => (
  <Typography variant="display-h1" as={as} {...props} />
);

/**
 * Secondary heading component for major page sections.
 *
 * @remarks
 * - Visual: `heading-h2` variant
 * - Semantic default: `<h2>`
 */
export const H2 = ({ as = "h2", ...props }: TypographyProps) => (
  <Typography variant="heading-h2" as={as} {...props} />
);

/**
 * Tertiary heading component for subsections.
 *
 * @remarks
 * - Visual: `heading-h3` variant
 * - Semantic default: `<h3>`
 */
export const H3 = ({ as = "h3", ...props }: TypographyProps) => (
  <Typography variant="heading-h3" as={as} {...props} />
);

/**
 * Quaternary heading component for minor subsections.
 *
 * @remarks
 * - Visual: `heading-h4` variant
 * - Semantic default: `<h4>`
 */
export const H4 = ({ as = "h4", ...props }: TypographyProps) => (
  <Typography variant="heading-h4" as={as} {...props} />
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
export const SubheadingXL = ({ as = "p", ...props }: TypographyProps) => (
  <Typography variant="subheading-xl" as={as} {...props} />
);

/**
 * Large subheading for descriptive text.
 *
 * @remarks
 * - Visual: `subheading-lg` variant
 * - Semantic default: `<p>`
 */
export const SubheadingLG = ({ as = "p", ...props }: TypographyProps) => (
  <Typography variant="subheading-lg" as={as} {...props} />
);

/**
 * Medium subheading for standard descriptive text.
 *
 * @remarks
 * - Visual: `subheading-md` variant
 * - Semantic default: `<p>`
 */
export const SubheadingMD = ({ as = "p", ...props }: TypographyProps) => (
  <Typography variant="subheading-md" as={as} {...props} />
);

/**
 * Small subheading for labels and tags.
 *
 * @remarks
 * - Visual: `subheading-sm` variant (uppercase with tracking)
 * - Semantic default: `<span>` (inline usage)
 */
export const SubheadingSM = ({ as = "span", ...props }: TypographyProps) => (
  <Typography variant="subheading-sm" as={as} {...props} />
);

/**
 * Extra small subheading for micro labels.
 *
 * @remarks
 * - Visual: `subheading-xs` variant (uppercase with tracking)
 * - Semantic default: `<span>` (inline usage)
 */
export const SubheadingXS = ({ as = "span", ...props }: TypographyProps) => (
  <Typography variant="subheading-xs" as={as} {...props} />
);

// --- BODY ---

/**
 * Large body text for emphasized paragraphs.
 *
 * @remarks
 * - Visual: `body-large` variant
 * - Semantic default: `<p>`
 */
export const BodyLarge = ({ as = "p", ...props }: TypographyProps) => (
  <Typography variant="body-large" as={as} {...props} />
);

/**
 * Base body text for standard paragraphs.
 *
 * @remarks
 * - Visual: `body-base` variant (default)
 * - Semantic default: `<p>`
 */
export const BodyBase = ({ as = "p", ...props }: TypographyProps) => (
  <Typography variant="body-base" as={as} {...props} />
);

/**
 * Small body text for secondary information.
 *
 * @remarks
 * - Visual: `body-small` variant
 * - Semantic default: `<p>`
 */
export const BodySmall = ({ as = "p", ...props }: TypographyProps) => (
  <Typography variant="body-small" as={as} {...props} />
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
export const ButtonText = ({ as = "span", ...props }: TypographyProps) => (
  <Typography variant="btn-text" as={as} {...props} />
);
