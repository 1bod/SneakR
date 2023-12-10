<template>
    <div class="flex flex-wrap justify-between">
            <SneakerCard
                v-for="sneaker in sneakerList"
                :sneaker="sneaker"
                :key="sneaker.id"
                class="sm:mx-auto"
            />
        </div>
</template>

<script setup lang="ts">
defineProps(["sneakerList"]);
</script>