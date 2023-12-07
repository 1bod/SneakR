<template>
    <div>
        <SearchBar />
        <div class="flex flex-wrap justify-between">
            <SneakerCard v-for="sneaker in sneakers?.sneakers" :sneaker="sneaker"/>
        </div>
    </div>
</template>

<script setup lang="ts">
const {data} = await useFetch('/api/sneakers', {
  headers: useRequestHeaders(['cookie'])
})
const sneakers = ref(data)
console.log(sneakers.value)
</script>
