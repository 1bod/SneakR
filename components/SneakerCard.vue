<template>
    <article
        class="flex flex-col relative h-auto lg:h-[200px] m-6 sm:m-6 w-full sm:w-auto"
    >
        <div
            class="rounded-[2.1rem] bg-white dark:bg-zinc-900 flex w-full sm:w-[32rem] p-2 flex-auto place-content-inherit align-items-inherit h-auto break-words text-left subpixel-antialiased relative flex-col md:flex-row md:items-center lg:max-h-52 gap-4 overflow-visible"
        >
            <div
                class="bg-gradient-to-br flex-none lg:mx-1 w-full md:w-44 h-44 mb-0 relative z-10 before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-gradient-to-br transition-all !ease-soft-spring !duration-500 will-change-auto before:transition-all rounded-3xl before:rounded-3xl before:from-[#edf9ff] dark:before:from-primary-950 before:to-primary dark:before:to-primary shadow-lg"
            >
                <NuxtImg
                    class="shadow-black/5 data-[loaded=true]:opacity-100 shadow-none transition-transform-opacity motion-reduce:transition-none object-[45%_50%] absolute z-10 inset-0 mx-auto w-9/12 md:w-full h-full object-cover rounded-lg transition-all will-change-auto !ease-soft-spring !duration-300 md:scale-90 sm:left-0"
                    :src="image"
                />
            </div>
            <div
                class="flex flex-col justify-between transition-all m-2 md:my-0 h-[168px]"
            >
                <div class="flex flex-col justify-center">
                    <p class="w-full text-gray-400 text-xs uppercase">
                        {{ sneaker.brand }}
                    </p>
                    <h2
                        class="relative w-full flex-none font-semibold text-foreground text-lg line-clamp-2"
                        :title="sneaker.name"
                    >
                        {{ sneaker.name }}
                    </h2>
                    <p class="my-1 w-full text-default-500 text-xs">
                        {{ sneaker.colorway }}
                    </p>
                    <p
                        class="relative text-md font-semibold text-foreground mt-1"
                    >
                        ${{ sneaker.retailPrice }}
                    </p>
                </div>
                <div class="flex gap-2 mt-2">
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
                    <UButton
                        :to="'/details/' + sneaker.id"
                        size="md"
                        color="primary"
                        variant="outline"
                        >Details</UButton
                    >
                    <UButton
                        :icon="
                            inCollection
                                ? 'i-heroicons-check'
                                : 'i-heroicons-plus'
                        "
                        size="sm"
                        color="primary"
                        square
                        variant="ghost"
                        @click="$emit('collection', sneaker)"
                    />
                    <UButton
                        :icon="
                            inWishlist
                                ? 'i-heroicons-heart-solid'
                                : 'i-heroicons-heart'
                        "
                        size="sm"
                        color="primary"
                        square
                        variant="ghost"
                        @click="$emit('wishlist', sneaker)"
                    />
                </div>
            </div>
        </div>
    </article>
</template>

<script setup lang="ts">
const props = defineProps(["sneaker", "inCollection", "inWishlist"]);
defineEmits(["collection", "wishlist"]);

function getImage(src: string): string {
    if (src && src != "[]" && src != "true" && src != "false") {
        return src;
    } else {
        return "/assets/img/Unicons question.svg";
    }
}

let image = getImage(props.sneaker.image?.small);
</script>
