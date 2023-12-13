<template>
    <main class="mx-auto w-full xl:w-10/12">
        <div class="overflow-hidden max-w-full h-[90vh] flex justify-center">
            <h1
                class="text-[15rem] font-black font-display text-center tracking-wider text-[#0009] dark:text-[#eee5] leading-none absolute -z-10 max-w-[80vw] mt-32"
                style="text-wrap: balance"
            >
                {{ sneaker?.silhouette || sneaker?.brand || "SneakR" }}
            </h1>
            <div class="h-[70vh]">
                <NuxtImg
                    class="object-scale-down object-center w-screen h-screen relative drop-shadow-2xl"
                    :style="`top: -${offset}px`"
                    :src="image"
                ></NuxtImg>
            </div>
        </div>
        <article class="min-h-[50vh] grid grid-cols-3 gap-32">
            <div class="col-span-2">
                <p class="w-full ml-0.5 text-gray-400 text-xs uppercase">
                    {{ sneaker?.brand }}
                </p>
                <h2 class="text-3xl font-bold font-display mb-1">
                    {{ sneaker?.name }}
                </h2>
                <p class="text-xl font-semibold font-display mb-2">
                    {{ sneaker?.colorway }}
                </p>
                <p>{{ sneaker?.story }}</p>
                <p v-if="sneaker?.releaseDate">
                    Released on {{ sneaker?.releaseDate }}
                </p>
            </div>
            <div>
                <div class="flex flex-row justify-between mx-4">
                    <h2 class="text-3xl font-bold font-display">
                        $
                        {{
                            sneaker?.retailPrice ||
                            sneaker?.estimatedMarketValue ||
                            "N/A"
                        }}
                    </h2>
                    <div class="flex flex-row gap-2">
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
                            @click="sneaker && collection(sneaker)"
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
                            @click="sneaker && wishlist(sneaker)"
                        />
                    </div>
                </div>
                <div class="flex flex-col gap-4 mt-4">
                    <UButton
                        v-for="(link, linkID) in sneaker?.links"
                        v-show="link != null"
                        :to="link"
                        size="md"
                        class="mx-4"
                        color="primary"
                        variant="solid"
                        target="_blank"
                        >Buy on {{ capitalize(String(linkID)) }}</UButton
                    >
                </div>
            </div>
        </article>
    </main>
</template>

<script setup lang="ts">
const route = useRoute();
const supabase = useSupabaseClient();
const user = useSupabaseUser();

definePageMeta({
  pageTransition: {
    name: 'details'
  }
})

type Sneaker = {
    UID: string;
    brand: string;
    colorway: string;
    createdAt: string;
    estimatedMarketValue: number;
    gender: string;
    id: number;
    image: {
        "360": any[];
        small?: string;
        original?: string;
        thumbnail?: string;
    };
    links: {
        goat?: string;
        stockX?: string;
        flightClub?: string;
        stadiumGoods?: string;
    };
    name: string;
    publishedAt: string;
    releaseDate: string;
    releaseYear: number;
    retailPrice: number;
    silhouette: string;
    sku: string;
    story: null | string;
    updatedAt: string;
};

let sneaker: Sneaker | null = null;
let image = "/assets/img/Unicons question.svg";

const { data, error } = await useFetch(`/api/sneakers/${route.params.id}`);
if (error?.value) {
    console.error(error);
} else {
    console.log(data);
    sneaker = data.value as unknown as Sneaker;
    image = getImage(sneaker.image);
    let linkId: keyof typeof sneaker.links;
    for (linkId in sneaker.links) {
        if (["", null, undefined].includes(sneaker.links[linkId])) {
            delete sneaker.links[linkId];
        }
    }
    console.log(image);
}

function getImage(src: Sneaker["image"]): string {
    if (src.small && src.small != "[]" && src.small != "true" && src.small != "false") {
        return src.small;
    } else if (src.original && src.original != "[]" && src.original != "true" && src.original != "false") {
        return src.original;
    } else if (
        src.thumbnail &&
        src.thumbnail != "[]" &&
        src.thumbnail != "true" && 
        src.thumbnail != "false"
    ) {
        return src.thumbnail;
    } else {
        return "/assets/img/Unicons question.svg";
    }
}

function capitalize(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

let offset = ref(0);
onMounted(() => {
    window.addEventListener("scroll", () => {
        offset.value = window.scrollY / 3;
    });
});

async function collection(sneaker: Sneaker) {
    if (!user.value) {
        return navigateTo("/login");
    }
    if (user?.value.user_metadata.collection?.includes(sneaker.id)) {
        let newCollection = user.value.user_metadata.collection.filter(
            (id: number) => id !== sneaker.id
        );
        const { data, error } = await supabase.auth.updateUser({
            data: { collection: newCollection },
        });
        if (error) {
            console.error(error);
        } else {
            console.log(data);
        }
    } else {
        let newCollection = [];
        if (user.value.user_metadata.collection) {
            newCollection = user.value.user_metadata.collection;
        }
        newCollection.push(sneaker.id);
        const { data, error } = await supabase.auth.updateUser({
            data: { collection: newCollection },
        });
        if (error) {
            console.error(error);
        } else {
            console.log(data);
        }
    }
}

async function wishlist(sneaker: Sneaker) {
    if (!user.value) {
        return navigateTo("/login");
    }
    if (user?.value.user_metadata.wishlist?.includes(sneaker.id)) {
        let newWishlist = user.value.user_metadata.wishlist.filter(
            (id: number) => id !== sneaker.id
        );
        const { data, error } = await supabase.auth.updateUser({
            data: { wishlist: newWishlist },
        });
        if (error) {
            console.error(error);
        } else {
            console.log(data);
        }
    } else {
        let newWishlist = [];
        if (user.value.user_metadata.wishlist) {
            newWishlist = user.value.user_metadata.wishlist;
        }
        newWishlist.push(sneaker.id);
        const { data, error } = await supabase.auth.updateUser({
            data: { wishlist: newWishlist },
        });
        if (error) {
            console.error(error);
        } else {
            console.log(data);
        }
    }
}

const inCollection = computed(() => {
    return user?.value?.user_metadata.collection?.includes(sneaker?.id);
});
const inWishlist = computed(() => {
    return user?.value?.user_metadata.wishlist?.includes(sneaker?.id);
});
</script>
