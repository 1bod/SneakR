<template>
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
</template>

<script lang="ts" setup>
useHead({
    htmlAttrs: {
        class: "dark:bg-black",
    },
    bodyAttrs: {
        class: "bg-gray-50 dark:bg-black",
    },
});
</script>
