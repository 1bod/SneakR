<template>
    <nav
        class="flex z-40 w-full h-auto items-center justify-center data-[menu-open=true]:border-none sticky top-0 inset-x-0 backdrop-blur-lg data-[menu-open=true]:backdrop-blur-xl backdrop-saturate-150 bg-background/70 mb-2"
    >
        <header
            class="z-40 flex px-6 gap-4 w-full flex-row relative flex-nowrap items-center justify-between h-[var(--navbar-height)] max-w-[1280px]"
        >
            <ul class="hidden lg:flex gap-4 justify-start items-center">
                <li><ULink to="/">SneakR</ULink></li>
                <ul>
                    <li><ULink to="/">Home</ULink></li>
                </ul>
            </ul>
            <ul class="hidden lg:flex gap-4 justify-start items-center">
                <li><ULink to="/collection">Collection</ULink></li>
                <li><ULink to="/wishlist">Wishlist</ULink></li>
                <li>
                    <UDropdown :items="items" mode="hover">
                        <ULink to="/account">
                            <UButton
                                icon="i-heroicons-user"
                                variant="ghost"
                                color="black"
                            />
                        </ULink>
                        <template #account="{ item }">
                            <div class="text-left">
                                <p>Signed in as</p>
                                <p
                                    class="truncate font-medium text-gray-900 dark:text-white"
                                >
                                    {{ item.label }}
                                </p>
                            </div>
                        </template>
                        <template #item="{ item }">
                            <UIcon
                                :name="item.icon"
                                class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500"
                                :class="
                                    item.label == 'Sign out'
                                        ? 'bg-red-500'
                                        : ''
                                "
                            />
                            <span
                                class="truncate"
                                :class="
                                    item.label == 'Sign out'
                                        ? 'text-red-500'
                                        : ''
                                "
                                >{{ item.label }}</span
                            >
                        </template>
                    </UDropdown>
                </li>
            </ul>
        </header>
    </nav>
</template>

<script setup lang="ts">
import type { DropdownItem } from "@nuxt/ui/dist/runtime/types";

const user = useSupabaseUser();
const supabase = useSupabaseClient()

const signOut = async () => {
  const { error } = await supabase.auth.signOut()
    if (error) {
        console.log(error)
    } else {
        reloadNuxtApp()
    }
}

const items: DropdownItem[][] = user.value ? [
    [
        {
            label: user?.value?.email || "Not logged in",
            slot: "account",
            disabled: true,
        },
    ],
    [
        {
            label: "Settings",
            icon: "i-heroicons-cog-8-tooth",
            click: () => navigateTo("/account"),
        },
        {
            label: "Sign out",
            icon: "i-heroicons-arrow-left-on-rectangle",
            click: signOut,
        },
    ],
] : [
    [
        {
            label: "Login",
            icon: "i-heroicons-arrow-right-on-rectangle",
            click: () => navigateTo("/login"),
        },
        {
            label: "Register",
            icon: "i-heroicons-user-plus",
            click: () => navigateTo("/register"),
        },
    ],
];
</script>