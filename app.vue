<template>
    <div>
        <NuxtLayout>
            <NuxtPage />
         </NuxtLayout>
        <UNotifications />
    </div>
</template>

<script lang="ts" setup>
useHead({
    htmlAttrs: {
        class: "h-full w-screen dark:bg-black",
    },
    bodyAttrs: {
        class: "h-full w-full max-w-full bg-gray-50 dark:bg-black overflow-x-hidden",
    },
});
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>