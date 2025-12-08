import type {Config} from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-poppins)', 'var(--font-pt-sans)', 'sans-serif'],
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        navy: '#0C1A36',
        success: '#1BC97B',
      },
      borderRadius: {
        '2xl': '1.5rem', // 24px
        'xl': '1.25rem', // 20px
        lg: '1rem', // 16px
        md: '0.75rem', // 12px
        sm: '0.5rem', // 8px
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
        'shine': {
          'from': { backgroundPosition: '200% 0' },
          'to': { backgroundPosition: '-200% 0' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 0 0px hsl(var(--primary) / 0.4)' },
          '50%': { boxShadow: '0 0 0 10px hsl(var(--primary) / 0)' },
        },
        'typing-dots': {
            '0%, 100%': { transform: 'translateY(0)' },
            '50%': { transform: 'translateY(-3px)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'shine': 'shine 2s linear infinite',
        'pulse-glow': 'pulse-glow 2s infinite',
        'typing-dots-1': 'typing-dots 1s infinite',
        'typing-dots-2': 'typing-dots 1s infinite 0.2s',
        'typing-dots-3': 'typing-dots 1s infinite 0.4s',
      },
      boxShadow: {
        'card': '0 4px 10px rgba(0,0,0,0.03)',
        'card-hover': '0 10px 25px -5px rgba(0,0,0,0.06), 0 4px 6px -2px rgba(0,0,0,0.05)',
        'button-primary': '0 4px 14px 0 hsla(225, 100%, 59%, 0.39)',
        'button-primary-hover': '0 6px 20px 0 hsla(225, 100%, 59%, 0.45)',
      }
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
