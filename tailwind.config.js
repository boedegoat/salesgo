const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: "class",
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx}",
        "./src/components/**/*.{js,ts,jsx,tsx}",
    ],
    important: "#__next",
    theme: {
        fontFamily: {
            sans: ["Inter", ...defaultTheme.fontFamily.sans],
        },
        extend: {},
    },
    plugins: [
        require("tailwind-scrollbar-hide"),
        require("@tailwindcss/forms"),
        require("daisyui"),
    ],
    daisyui: {
        base: false,
        themes: [
            {
                light: {
                    ...require("daisyui/src/colors/themes")[
                        "[data-theme=light]"
                    ],
                    primary: colors.teal[500],
                    "primary-focus": colors.teal[400],
                    secondary: colors.orange[500],
                    "base-100": colors.slate[50],
                    "base-content": colors.slate[300],
                },
            },
        ],
    },
};
