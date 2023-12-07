<template>
    <div>
        <NuxtLayout>
            <NuxtPage /> </NuxtLayout>
            <UNotifications />
    </div>
</template>

<script lang="ts" setup>
useHead({
    htmlAttrs: {
        class: "h-full w-full dark:bg-black",
    },
    bodyAttrs: {
        class: "h-full w-full bg-gray-50 dark:bg-black",
    },
});
</script>
