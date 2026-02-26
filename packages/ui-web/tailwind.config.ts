import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{astro,ts,tsx}",
    "./components/**/*.{astro,ts,tsx}",
    "./app/**/*.{astro,ts,tsx}",
    "./src/**/*.{astro,ts,tsx}",
    // Adicione o path da sua lib de UI se for monorepo
    "../../packages/ui/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-primary)", "sans-serif"],
      },
      fontSize: {
        // Fluid range: 320px → 1280px viewport
        "display-h1": [
          "clamp(2rem, 4vw + 1rem, 3rem)", // 32px → 48px
          { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "700" },
        ],
        "heading-h2": [
          "clamp(1.5rem, 3vw + 1rem, 2.25rem)", // 24px → 36px
          { lineHeight: "1.2", letterSpacing: "-0.01em", fontWeight: "600" },
        ],
        "heading-h3": [
          "clamp(1.125rem, 0.625vw + 1rem, 1.5rem)", // 18px → 24px
          { lineHeight: "1.33", fontWeight: "600" },
        ],
        "heading-h4": [
          "clamp(1rem, 0.5vw + 0.875rem, 1.25rem)", // 16px → 20px
          { lineHeight: "1.4", fontWeight: "600" },
        ],
        "subheading-xl": [
          "clamp(1.125rem, 0.625vw + 1rem, 1.5rem)", // 18px → 24px
          { lineHeight: "1.3", fontWeight: "500" },
        ],
        "subheading-lg": [
          "clamp(1rem, 0.5vw + 0.875rem, 1.25rem)", // 16px → 20px
          { lineHeight: "1.4", fontWeight: "500" },
        ],
        "subheading-md": [
          "clamp(0.9375rem, 0.3125vw + 0.875rem, 1.125rem)", // 15px → 18px
          { lineHeight: "1.4", fontWeight: "500" },
        ],
        "subheading-sm": [
          "clamp(0.8125rem, 0.3125vw + 0.75rem, 1rem)", // 13px → 16px
          { lineHeight: "1.0", fontWeight: "500" },
        ],
        "subheading-xs": [
          "clamp(0.6875rem, 0.3125vw + 0.625rem, 0.875rem)", // 11px → 14px
          { lineHeight: "1.0", fontWeight: "500" },
        ],
        "body-large": [
          "clamp(0.9375rem, 0.3125vw + 0.875rem, 1.125rem)", // 15px → 18px
          { lineHeight: "1.6" },
        ],
        "body-base": [
          "clamp(0.875rem, 0.25vw + 0.8rem, 1rem)", // 14px → 16px
          { lineHeight: "1.5" },
        ],
        "body-small": [
          "clamp(0.75rem, 0.25vw + 0.7rem, 0.875rem)", // 12px → 14px
          { lineHeight: "1.4" },
        ],
        "btn-text": [
          "clamp(0.875rem, 0.25vw + 0.8rem, 1rem)", // 14px → 16px
          { lineHeight: "1.0", fontWeight: "600", letterSpacing: "0.01em" },
        ],
      },
      colors: {
        // --- CORES SEMÂNTICAS (Base do shadcn) ---
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },

        // --- CORES DE MARCA ESPECÍFICAS ("Curator") ---
        brand: {
          blue: "hsl(var(--brand-blue))",
          dark: "hsl(var(--brand-blue-dark))",
        },
        status: {
          green: "hsl(var(--status-green))",
          red: "hsl(var(--status-red))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;

export default config;
