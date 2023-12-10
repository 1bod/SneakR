<template>
    <main class="mx-auto min-h-[90vh] w-full xl:w-10/12">
        <p>Redirecting...</p>
    </main>
</template>

<script setup lang="ts">
const user = useSupabaseUser();

watch(
    user,
    () => {
        if (user.value) {
            reloadNuxtApp()
            return navigateTo("/");
        }
    },
    { immediate: true }
);
</script>
