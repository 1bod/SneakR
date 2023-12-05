/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
    theme: {
        fontFamily: {
            sans: ['"DM Sans"', "Inter", ...defaultTheme.fontFamily.sans],
        },
        extend: {
            colors: {
                black: "#0d0c0c",
            },
        },
    },
};
