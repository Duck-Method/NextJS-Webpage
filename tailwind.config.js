// tailwind.config.js
/** @type {inport('tailwindcss').config} */
module.exports = {
    content: [
      './app/**/*.{js,ts,jsx,tsx}', // Include all files in the app directory
      './app/components/**/*.{js,ts,jsx,tsx}', // Include all files in the components directory
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  };