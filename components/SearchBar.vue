<template>
    <UInput
        icon="i-heroicons-magnifying-glass"
        size="sm"
        color="gray"
        placeholder="Search..."
        :value="modelQuery"
        @input="modelQuery = $event.target.value"
        class="mx-6 md:mx-8"
    />
</template>

<script setup>
defineProps(["modelQuery"]);
defineEmits(["update:modelQuery"]);
</script>
