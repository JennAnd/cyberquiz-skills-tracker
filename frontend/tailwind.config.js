module.exports = {
  // Tell Tailwind where to look for class names
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // butter-yellow accent
        butter: "#F5D063",
        // cocoa brown, plus a darker shade for headings
        cocoa: {
          DEFAULT: "#8B5E3C",
          dark: "#6F472B",
        },
        // warm off-white background
        linen: "#F9F8F4",
      },
    },
  },
  plugins: [],
};
