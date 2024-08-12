/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        },
        blue: {
          400: '#60A5FA',
          600: '#2563EB',
          700: '#1D4ED8',
        },
        green: {
          400: '#34D399',
          500: '#10B981',
          600: '#059669',
        },
        red: {
          400: '#F87171',
          500: '#EF4444',
          600: '#DC2626',
        },
      },
    },
  },
  plugins: [],
}
