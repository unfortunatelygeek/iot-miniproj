/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        warmBrowns: {
          light: '#C19A6B',
          DEFAULT: '#A67B5B',
          dark: '#8B6B4E',
        },
        earthyTans: {
          light: '#D2B48C',
          DEFAULT: '#D9C8B1',
          dark: '#CFBFA1',
        },
        goldenYellows: {
          light: '#FFD700',
          DEFAULT: '#FBBD08',
          dark: '#E5B800',
        },
        softGreens: {
          light: '#8DA399',
          DEFAULT: '#ADB99A',
          dark: '#C2D197',
        },
        tranquilBlues: {
          light: '#87CEEB',
          DEFAULT: '#ADD8E6',
          dark: '#B0E0E6',
        },
        cream: '#FFFDD0',
      },
    },
    fontFamily: {
      pthin: ["Poppins-Thin", "sans-serif"],
      pextralight: ["Poppins-ExtraLight", "sans-serif"],
      plight: ["Poppins-Light", "sans-serif"],
      pregular: ["Poppins-Regular", "sans-serif"],
      pmedium: ["Poppins-Medium", "sans-serif"],
      psemibold: ["Poppins-SemiBold", "sans-serif"],
      pbold: ["Poppins-Bold", "sans-serif"],
      pextrabold: ["Poppins-ExtraBold", "sans-serif"],
      pblack: ["Poppins-Black", "sans-serif"],
    },
  },
  plugins: [],
}