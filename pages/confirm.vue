<template>
    <div>
        <p>Redirecting...</p>
    </div>
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
