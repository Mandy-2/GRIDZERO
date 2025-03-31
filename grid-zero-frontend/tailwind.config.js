/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,ts,jsx,tsx,mdx}",
      "./pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./components/**/*.{js,ts,jsx,tsx,mdx}",
      "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
      extend: {
        fontFamily: {
          square: ['Square One', 'monospace'],
          mono: ['JetBrains Mono', 'monospace'],
        },
        colors: {
          neon: '#00fff7',
        },
      },
    },
    plugins: [],
  }
  