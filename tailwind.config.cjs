/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Add a custom breakpoint 'desktop' at 1360px so we don't override Tailwind defaults
      screens: {
        desktop: '1360px',
      },
      // Set container max-width to 1360px for xl so layout max width increases from 1280 -> 1360
      container: {
        center: true,
        padding: '1rem',
        screens: {
          xl: '1360px',
        },
      },
      // Semantic font scale to avoid arbitrary font sizes in templates
      fontSize: {
        'ui-xs': ['0.6875rem', { lineHeight: '1rem' }], // ~11px
        'ui-sm': ['0.8125rem', { lineHeight: '1.25rem' }], // ~13px
        'ui-base': ['1rem', { lineHeight: '1.5rem' }], // 16px
        'ui-lg': ['1.25rem', { lineHeight: '1.4rem' }], // 20px
        'ui-xl': ['1.5rem', { lineHeight: '1.25' }], // 24px
        // semantic tokens
        title: ['1.25rem', { lineHeight: '1.2' }],
        lead: ['1.125rem', { lineHeight: '1.4' }],
      },
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
        secondary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
        // Semantic brand color (replaces hard-coded #1E5BF4 in components)
        brand: {
          50: '#eef4ff',
          100: '#d9e6ff',
          200: '#b3ccff',
          300: '#86aeff',
          400: '#5e8fff',
          500: '#3f77ff',
          600: '#1E5BF4',
          700: '#174BD8',
          800: '#133eb6',
          900: '#0f2f87',
        },
        // Alias palette so classes like text-dark-900 work
        dark: {
          100: '#f3f4f6', // gray-100
          600: '#4b5563', // gray-600
          900: '#111827', // gray-900
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
