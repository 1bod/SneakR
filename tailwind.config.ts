import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

export default <Partial<Config>>{
    theme: {
        fontFamily: {
            sans: ["'Work Sans'", "Inter", ...defaultTheme.fontFamily.sans],
            display: ["Trap", ...defaultTheme.fontFamily.sans],
        },
        extend: {
            colors: {
                black: "#0d0c0c",
                gray: {
                    50: "#f7f7f8",
                    100: "#eeeef0",
                    200: "#dadadd",
                    300: "#babbbf",
                    400: "#94959c",
                    500: "#767681",
                    600: "#606169",
                    700: "#4e4e56",
                    800: "#434349",
                    900: "#3b3c3f",
                    950: "#27272a",
                },
            },
        },
    },
};
