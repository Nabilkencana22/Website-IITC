/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
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
      colors: {
        border: "var(--color-border)", /* border-gray */
        input: "var(--color-input)", /* subtle-puppet-stage-gray */
        ring: "var(--color-ring)", /* warm-gamelan-gold */
        background: "var(--color-background)", /* deep-shadow-black */
        foreground: "var(--color-foreground)", /* warm-cream */
        primary: {
          DEFAULT: "var(--color-primary)", /* warm-gamelan-gold */
          foreground: "var(--color-primary-foreground)", /* deep-shadow-black */
        },
        secondary: {
          DEFAULT: "var(--color-secondary)", /* rich-earth-brown */
          foreground: "var(--color-secondary-foreground)", /* warm-cream */
        },
        destructive: {
          DEFAULT: "var(--color-destructive)", /* muted-coral */
          foreground: "var(--color-destructive-foreground)", /* warm-cream */
        },
        muted: {
          DEFAULT: "var(--color-muted)", /* subtle-puppet-stage-gray */
          foreground: "var(--color-muted-foreground)", /* soft-silver */
        },
        accent: {
          DEFAULT: "var(--color-accent)", /* vibrant-terracotta */
          foreground: "var(--color-accent-foreground)", /* warm-cream */
        },
        popover: {
          DEFAULT: "var(--color-popover)", /* subtle-puppet-stage-gray */
          foreground: "var(--color-popover-foreground)", /* warm-cream */
        },
        card: {
          DEFAULT: "var(--color-card)", /* subtle-puppet-stage-gray */
          foreground: "var(--color-card-foreground)", /* warm-cream */
        },
        success: {
          DEFAULT: "var(--color-success)", /* forest-green */
          foreground: "var(--color-success-foreground)", /* warm-cream */
        },
        warning: {
          DEFAULT: "var(--color-warning)", /* golden-amber */
          foreground: "var(--color-warning-foreground)", /* deep-shadow-black */
        },
        error: {
          DEFAULT: "var(--color-error)", /* muted-coral */
          foreground: "var(--color-error-foreground)", /* warm-cream */
        },
        cultural: {
          gold: "var(--color-cultural-gold)", /* warm-cultural-gold */
          "gold-foreground": "var(--color-cultural-gold-foreground)", /* deep-shadow-black */
          shadow: "var(--color-shadow-black)", /* deep-shadow-black */
          "shadow-foreground": "var(--color-shadow-black-foreground)", /* warm-cream */
          parchment: "var(--color-parchment)", /* soft-parchment */
          "parchment-foreground": "var(--color-parchment-foreground)", /* deep-cultural-brown */
        },
      },
      fontFamily: {
        heading: ["var(--font-heading)"], /* playfair-display */
        body: ["var(--font-body)"], /* inter */
        cta: ["var(--font-cta)"], /* poppins */
        accent: ["var(--font-accent)"], /* crimson-text */
      },
      fontSize: {
        'cultural-xs': ['0.75rem', { lineHeight: '1rem' }],
        'cultural-sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'cultural-base': ['1rem', { lineHeight: '1.5rem' }],
        'cultural-lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'cultural-xl': ['1.25rem', { lineHeight: '1.75rem' }],
        'cultural-2xl': ['1.5rem', { lineHeight: '2rem' }],
        'cultural-3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        'cultural-4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        'cultural-5xl': ['3rem', { lineHeight: '1' }],
        'cultural-6xl': ['3.75rem', { lineHeight: '1' }],
      },
      spacing: {
        'cultural-xs': 'var(--spacing-xs)', /* 8px */
        'cultural-sm': 'var(--spacing-sm)', /* 16px */
        'cultural-md': 'var(--spacing-md)', /* 24px */
        'cultural-lg': 'var(--spacing-lg)', /* 40px */
        'cultural-xl': 'var(--spacing-xl)', /* 64px */
      },
      boxShadow: {
        'puppet': 'var(--shadow-puppet)', /* wayang-inspired-dramatic */
        'cultural': 'var(--shadow-cultural)', /* warm-cultural-shadow */
        'subtle': 'var(--shadow-subtle)', /* gentle-elevation */
      },
      animation: {
        'gamelan-pulse': 'gamelan-pulse 4s ease-in-out infinite',
        'shadow-flicker': 'shadow-flicker 4s ease-in-out infinite',
        'puppet-float': 'puppet-float 6s ease-in-out infinite',
        'cultural-glow': 'cultural-glow 3s ease-in-out infinite alternate',
      },
      keyframes: {
        'gamelan-pulse': {
          '0%, 100%': { opacity: '0.7' },
          '50%': { opacity: '1' },
        },
        'shadow-flicker': {
          '0%, 100%': { 
            opacity: '0.7',
            filter: 'brightness(1)',
          },
          '50%': { 
            opacity: '1',
            filter: 'brightness(1.1)',
          },
        },
        'puppet-float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'cultural-glow': {
          '0%': { boxShadow: '0 0 20px rgba(184, 134, 11, 0.3)' },
          '100%': { boxShadow: '0 0 30px rgba(184, 134, 11, 0.6)' },
        },
      },
      transitionTimingFunction: {
        'cultural': 'var(--timing-cultural)', /* wayang-smooth */
        'puppet': 'var(--timing-puppet)', /* puppet-bounce */
      },
      transitionDuration: {
        'cultural-fast': 'var(--timing-fast)', /* 200ms */
        'cultural-normal': 'var(--timing-normal)', /* 300ms */
        'cultural-slow': 'var(--timing-slow)', /* 400ms */
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      backdropBlur: {
        'cultural': '8px',
      },
      zIndex: {
        'cultural-shadow': '1',
        'cultural-puppet': '2',
        'cultural-context': '3',
        'cultural-overlay': '50',
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
}