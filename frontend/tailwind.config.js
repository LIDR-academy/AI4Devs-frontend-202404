/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // adjust the file extensions according to your project
  ],
  theme: {
    extend: {
      boxShadow: {
        'even': '0 2px 4px rgba(0, 0, 0, 0.1)'
      }
    }
  },
  plugins: [],
}
