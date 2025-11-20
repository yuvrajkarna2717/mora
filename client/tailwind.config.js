// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],

  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['var(--font-heading)', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      colors: {
        theme: {
          bg: 'var(--color-bg)',
          text: 'var(--color-text)',
          secondary: 'var(--color-secondary)',
          border: 'var(--color-border)',
          accent: 'var(--color-accent)',
          grid: 'var(--color-grid)',
        },
      },
    },
  },
  plugins: [],
};
