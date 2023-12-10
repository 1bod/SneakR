// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    modules: [
        "@nuxt/ui",
        "@nuxt/image",
        "@nuxtjs/supabase",
        "@nuxtjs/tailwindcss",
        "@nuxtjs/google-fonts",
    ],
    supabase: {
        redirectOptions: {
            login: "/login",
            callback: "/",
            exclude: [
                "/",
                "/login",
                "/register",
                "/confirm",
                "/forgotpassword",
                "/resetpassword",
                "/details/*",
                "/assets/*",
            ],
        },
    },
    googleFonts: {
        download: true,
        families: {
            "Work Sans": [400, 600, 700],
        },
        preload: true,
    }
});
