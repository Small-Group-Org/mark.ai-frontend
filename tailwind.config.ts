import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/index.html", "./client/src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'inter': ['Inter', 'sans-serif']
      },
      backgroundImage: {
        'gradient-primary': 'var(--gradient-primary)',
        'gradient-primary-hover': 'var(--gradient-primary-hover)',
        'gradient-secondary': 'var(--gradient-secondary)',
        'gradient-accent': 'var(--gradient-accent)',
        'gradient-success': 'var(--gradient-success)',
        'gradient-neon': 'var(--gradient-neon)',
        'gradient-animated': 'var(--gradient-animated)',
        'gradient-mesh': 'var(--gradient-mesh)',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        'dark-bg': 'var(--dark-bg)',
        'light-bg': 'var(--light-bg)',
        'card-bg': 'var(--card-bg)',
        'glass-bg': 'var(--glass-bg)',
        'neon-blue': 'var(--neon-blue)',
        'neon-purple': 'var(--neon-purple)',
        'neon-pink': 'var(--neon-pink)',
        'neon-green': 'var(--neon-green)',
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
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        // Calendar specific colors
				'calendar-bg': '#F9FAFB',
				'calendar-grid': '#FFFFFF',
				'today-bg': '#0B57D0',
				'today-text': '#FFFFFF',
				'toggle-active': '#0891B2',
				'toggle-inactive': '#EBF3F5',
				'toggle-active-text': '#FFFFFF',
				'toggle-inactive-text': '#1F2937',
				'day-text': '#1F1F1F',
				'scheduled-post': '#69C9D0',
				'draft-post': '#DBDBDB',
				'post-time': '#323B43',
				'current-time': '#DB372D',
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
        "ping-slow": {
          "0%, 100%": { 
            transform: "scale(1)",
            opacity: "0.8"
          },
          "50%": { 
            transform: "scale(1.2)", 
            opacity: "0" 
          }
        },
        "blink": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.3" }
        },
        "gradientShift": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" }
        },
        "neonPulse": {
          "0%, 100%": { 
            boxShadow: "0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor",
            opacity: "1"
          },
          "50%": { 
            boxShadow: "0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor",
            opacity: "0.8"
          }
        },
        "floatGentle": {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "33%": { transform: "translateY(-10px) rotate(1deg)" },
          "66%": { transform: "translateY(5px) rotate(-1deg)" }
        },
        "scaleIn": {
          "0%": { 
            transform: "scale(0.8) translateY(20px)",
            opacity: "0"
          },
          "100%": { 
            transform: "scale(1) translateY(0)",
            opacity: "1"
          }
        },
        "slideInLeft": {
          "0%": {
            transform: "translateX(-50px)",
            opacity: "0"
          },
          "100%": {
            transform: "translateX(0)",
            opacity: "1"
          }
        },
        "slideInRight": {
          "0%": {
            transform: "translateX(50px)",
            opacity: "0"
          },
          "100%": {
            transform: "translateX(0)",
            opacity: "1"
          }
        },
        "morphButton": {
          "0%": { borderRadius: "0.5rem" },
          "50%": { borderRadius: "2rem" },
          "100%": { borderRadius: "0.5rem" }
        },
        "confetti": {
          "0%": { 
            transform: "translateY(0) rotate(0deg)",
            opacity: "1"
          },
          "100%": { 
            transform: "translateY(-100vh) rotate(720deg)",
            opacity: "0"
          }
        },
        "shimmer": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" }
        },
        "parallaxFloat": {
          "0%, 100%": { transform: "translateY(0px) translateX(0px)" },
          "25%": { transform: "translateY(-5px) translateX(2px)" },
          "50%": { transform: "translateY(-10px) translateX(0px)" },
          "75%": { transform: "translateY(-5px) translateX(-2px)" }
        },
        "successRipple": {
          "0%": {
            width: "0",
            height: "0"
          },
          "100%": {
            width: "300px",
            height: "300px"
          }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "ping-slow": "ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite",
        "blink": "blink 2.5s ease-in-out infinite",
        "gradient-shift": "gradientShift 8s ease infinite",
        "neon-pulse": "neonPulse 2s ease-in-out infinite",
        "float-gentle": "floatGentle 6s ease-in-out infinite",
        "scale-in": "scaleIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "slide-in-left": "slideInLeft 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "slide-in-right": "slideInRight 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "morph-button": "morphButton 3s ease-in-out infinite",
        "confetti": "confetti 3s linear forwards",
        "shimmer": "shimmer 2s linear infinite",
        "parallax-float": "parallaxFloat 8s ease-in-out infinite",
        "success-ripple": "successRipple 0.6s ease-out"
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
