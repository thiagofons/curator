import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
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
        "display-h1": ["60px", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "heading-h2": ["36px", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        "heading-h3": ["24px", { lineHeight: "1.33" }],
        "heading-h4": ["20px", { lineHeight: "1.4" }],
        "subheading-xl": ["24px", { lineHeight: "1.3", fontWeight: "500" }],
        "subheading-lg": ["20px", { lineHeight: "1.4", fontWeight: "500" }],
        "subheading-md": ["18px", { lineHeight: "1.4", fontWeight: "500" }],
        "subheading-sm": ["16px", { lineHeight: "1.0", fontWeight: "500" }],
        "subheading-xs": ["14px", { lineHeight: "1.0", fontWeight: "500" }],
        "body-large": ["18px", { lineHeight: "1.6" }],
        "body-base": ["16px", { lineHeight: "1.5" }],
        "body-small": ["14px", { lineHeight: "1.4" }],
        "btn-text": [
          "16px",
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
