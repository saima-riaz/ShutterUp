/** @type {import('tailwindcss').Config} */
module.exports = {

  // Specify the files Tailwind should scan for class names
  content: [
    "./index.html", // Include the index.html file
    "./src/**/*.{js,jsx,ts,tsx}", // Include JavaScript, JSX, TypeScript,TSX,'src' directory
  ],
  theme: {
    extend: {
      // Extend the default theme with custom values
      
       fontFamily: {  // Add custom fonts to the theme
        sans: ['Satisfy", cursive', 'sans-serif'],
        lavish: ['"Lavishly Yours"', 'cursive'],
      },
      
      screens: { // Define custom breakpoints for responsive design
        'xs': '375px',     // Small phones
        'sm': '640px',     // Phones
        'md': '768px',     // Tablets
        'lg': '1024px',    // Laptops
        'xl': '1280px',    // Desktops
        '2xl': '1536px',   // Large screens
      }
    },
  },
  plugins: [], // No plugins are included in this setup

}