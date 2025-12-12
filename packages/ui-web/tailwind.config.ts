import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config = {
  darkMode: ["class"],
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
        // Display
        "display-h1": ["60px", { lineHeight: "1.1" }], // 110%

        // Heading
        "heading-h2": ["36px", { lineHeight: "1.2" }], // 120%
        "heading-h3": ["24px", { lineHeight: "1.33" }], // 133%
        "heading-h4": ["20px", { lineHeight: "1.4" }], // 140%

        // Subheading
        "subheading-xl": ["24px", { lineHeight: "1.3" }], // 130%
        "subheading-lg": ["20px", { lineHeight: "1.4" }], // 140%
        "subheading-md": ["18px", { lineHeight: "1.4" }], // 140%
        "subheading-sm": ["16px", { lineHeight: "1.0" }], // 100%
        "subheading-xs": ["14px", { lineHeight: "1.0" }], // 100%

        // Body
        "body-large": ["18px", { lineHeight: "1.6" }], // 160%
        "body-base": ["16px", { lineHeight: "1.5" }], // 150%
        "body-small": ["14px", { lineHeight: "1.4" }], // 140%

        // Button
        "btn-text": ["16px", { lineHeight: "1.0" }], // 100%
      },
      colors: {
        yellow: {
          theme: "var(--fluorescent-yellow)",
        },
        green: {
          theme: "var(--fluorescent-green)",
        },
        blue: {
          theme: "var(--fluorescent-blue)",
        },
        orange: {
          theme: "var(--fluorescent-orange)",
        },
        white: {
          theme: "white",
        },
        gray: {
          lighter: "var(--gray-lighter)",
          light: "var(--gray-light)",
          normal: "var(--gray-normal)",
          dark: "var(--gray-dark)",
          darker: "var(--gray-darker)",
        },
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
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [tailwindcssAnimate],
  content: ["./src/**/*.{ts,tsx}"],
} satisfies Config;

export default config;
