/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          900: '#020617',
          800: '#0f172a',
          700: '#1e293b',
          500: '#06b6d4',
          400: '#22d3ee',
        },
        editor: {
            bg: '#18181b',
            panel: '#27272a',
            border: '#3f3f46',
            text: '#e4e4e7',
            muted: '#a1a1aa',
            accent: '#3b82f6'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
