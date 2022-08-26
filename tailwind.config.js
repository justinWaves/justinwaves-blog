/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "header-background":
          "url('https://www.dropbox.com/s/v80d6lfot141r14/jw-blog-header.jpg?dl=0')",
      },
    },
    plugins: [],
  },
};
