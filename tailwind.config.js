/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eef2ff",
          100: "#e0e7ff",
          200: "#c7d2fe",
          300: "#a5b4fc",
          400: "#818cf8",
          500: "#6366f1",
          600: "#4f46e5",
          700: "#4338ca",
          800: "#3730a3",
          900: "#312e81",
        },
        gray: {
          50: "#fafafa",
          100: "#f4f4f5",
          200: "#e4e4e7",
          300: "#d4d4d8",
          400: "#a1a1aa",
          500: "#71717a",
          600: "#52525b",
          700: "#3f3f46",
          800: "#27272a",
          900: "#18181b",
        },
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
        "slide-down": "slideDown 0.5s ease-out",
        "scale-up": "scaleUp 0.3s ease-out",
        float: "float 3s ease-in-out infinite",
        "gradient-x": "gradient-x 15s ease infinite",
        "gradient-y": "gradient-y 15s ease infinite",
        wiggle: "wiggle 1s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        scaleUp: {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "gradient-y": {
          "0%, 100%": {
            "background-size": "400% 400%",
            "background-position": "center top",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "center center",
          },
        },
        "gradient-x": {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            "code::before": { content: "" },
            "code::after": { content: "" },
            code: {
              color: theme("colors.primary.500"),
              backgroundColor: theme("colors.gray.100"),
              borderRadius: theme("borderRadius.md"),
              paddingLeft: theme("spacing.1"),
              paddingRight: theme("spacing.1"),
              fontWeight: "400",
            },
            pre: {
              backgroundColor: theme("colors.gray.100"),
              color: theme("colors.gray.900"),
              overflowX: "auto",
              fontWeight: "400",
            },
            "pre code": {
              backgroundColor: "transparent",
              borderWidth: "0",
              fontWeight: "400",
              padding: "0",
              color: "inherit",
            },
            "h1,h2,h3,h4": {
              color: theme("colors.gray.900"),
              fontWeight: "600",
            },
            a: {
              color: theme("colors.primary.500"),
              textDecoration: "none",
              "&:hover": {
                color: theme("colors.primary.600"),
              },
            },
            blockquote: {
              borderLeftColor: theme("colors.gray.200"),
              color: theme("colors.gray.600"),
            },
          },
        },
        dark: {
          css: {
            color: theme("colors.gray.300"),
            code: {
              color: theme("colors.primary.400"),
              backgroundColor: theme("colors.gray.800"),
            },
            pre: {
              backgroundColor: theme("colors.gray.800"),
              color: theme("colors.gray.100"),
            },
            "h1,h2,h3,h4": {
              color: theme("colors.white"),
            },
            a: {
              color: theme("colors.primary.400"),
              "&:hover": {
                color: theme("colors.primary.300"),
              },
            },
            blockquote: {
              borderLeftColor: theme("colors.gray.700"),
              color: theme("colors.gray.400"),
            },
          },
        },
      }),
      boxShadow: {
        hover:
          "0 0 0 1px rgba(99, 102, 241, 0.1), 0 4px 8px -2px rgba(99, 102, 241, 0.1), 0 2px 4px -2px rgba(99, 102, 241, 0.06)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
