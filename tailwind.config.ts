import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";
import plugin from "tailwindcss/plugin";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [
    animate,
    plugin(({ addComponents }) => {
      addComponents({
        ".glass-box": {
          "@apply border rounded-[4px] dark:border-[rgb(41,41,41)] border-[rgba(255,255,255,0.3)] relative":
            {},
          "&::before": {
            content: '""',
            "@apply absolute inset-0 rounded-[4px] -z-10": {},
            background:
              "linear-gradient(120deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.035) 25%, rgba(255,255,255,0.02) 50%, rgba(255,255,255,0.035) 75%, rgba(255,255,255,0.02) 100%)",
          },
          background:
            "radial-gradient(100% 100% at 0% 0%, rgba(255,255,255,0.03) 0%, transparent 100%), radial-gradient(100% 100% at 100% 0%, rgba(255,255,255,0.03) 0%, transparent 100%), radial-gradient(100% 100% at 100% 100%, rgba(255,255,255,0.03) 0%, transparent 100%), radial-gradient(100% 100% at 0% 100%, rgba(255,255,255,0.03) 0%, transparent 100%)",
          "backdrop-filter": "blur(12px) saturate(200%)",
          "-webkit-backdrop-filter": "blur(12px) saturate(200%)",
          "box-shadow":
            "rgba(0, 0, 0, 0.1) 2px 4px 16px 0px, rgba(0, 0, 0, 0.05) 0px 2px 4px 0px",
        },
      });
    }),
  ],
} satisfies Config;
