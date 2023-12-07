<template>
    <article class="flex flex-col relative h-auto lg:h-[200px] m-4">
        <div
            class="rounded-3xl bg-white dark:bg-zinc-900 flex w-[32rem] p-2 flex-auto place-content-inherit align-items-inherit h-auto break-words text-left subpixel-antialiased relative flex-col md:flex-row md:items-center gap-8 overflow-visible"
        >
            <div
                class="bg-gradient-to-br flex-none w-full sm:w-44 h-44 mb-4 sm:mb-0 relative z-10 before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-gradient-to-br transition-all !ease-soft-spring !duration-500 will-change-auto before:transition-all lg:scale-[1.3] rounded-3xl before:rounded-3xl before:from-[#edf9ff] dark:before:from-primary-950 before:to-primary dark:before:to-primary shadow-lg"
            >
                <NuxtImg
                    class="shadow-black/5 data-[loaded=true]:opacity-100 shadow-none transition-transform-opacity motion-reduce:transition-none object-[45%_50%] absolute z-10 inset-0 w-full h-full object-cover rounded-lg transition-all will-change-auto !ease-soft-spring !duration-300 sm:scale-90 sm:left-0"
                    :src="sneaker.image?.original"
                />
            </div>
            <div
                class="flex flex-col justify-center transition-all h-[150px] mx-2"
            >
                <h1
                    class="relative w-full flex-none font-semibold text-foreground text-lg"
                >
                    {{ sneaker.name }}
                </h1>
                <p class="my-1 w-full text-default-500 text-xs">
                    {{ sneaker.colorway }}
                </p>
                <p class="relative text-md font-semibold text-foreground mt-1">
                    ${{ sneaker.retailPrice }}
                </p>
                <div class="flex gap-2 mt-4">
                    <UButton
                        :to="
                            sneaker.links.goat ||
                            sneaker.links.stockX ||
                            sneaker.links.flightClub ||
                            sneaker.links.stadiumGoods
                        "
                        target="_blank"
                        size="md"
                        color="primary"
                        variant="solid"
                        >Buy Now</UButton
                    >
                    <UButton :to="'/details/' + sneaker.id" size="md" color="primary" variant="outline"
                        >Details</UButton
                    >
                    <UButton
                        icon="i-heroicons-plus"
                        size="sm"
                        color="primary"
                        square
                        variant="ghost"
                    />
                    <UButton
                        icon="i-heroicons-heart"
                        size="sm"
                        color="primary"
                        square
                        variant="ghost"
                    />
                </div>
            </div>
        </div>
    </article>
</template>

<script setup lang="ts">
defineProps(["sneaker"]);
</script>
