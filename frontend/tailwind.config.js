// This file is used to configure Tailwind CSS, a utility-first CSS framework.
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{js,jsx}",
    ],
    theme: {
      extend: {
        keyframes: {
          hiUserGlow: {
            '0%, 100%': { transform: 'scale(1)', opacity: 1 },
            '50%': { transform: 'scale(1.05)', opacity: 0.85 },
          },
        },
        animation: {
          hiUserGlow: 'hiUserGlow 2s ease-in-out infinite',
        },
      }
      ,
    },
    plugins: [],
  }
  