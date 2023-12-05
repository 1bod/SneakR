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
        redirect: false,
    },
    googleFonts: {
        download: true,
        families: {
            "DM Sans": [400, 600, 700],
        },
        preload: true,
    },
});
