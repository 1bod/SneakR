<template>
    <div>
        <HeroComponent>
            <template #title> Collection </template>
            <template #description>
                List the sneakers you already own
            </template>
        </HeroComponent>
        <main class="mx-auto w-full xl:w-10/12">
            <SneakerList :sneaker-list="sneakers?.sneakers" />
            <UPagination
                class="mx-auto w-full justify-center pb-10"
                v-model="page"
                :page-count="sneakers?.meta.items_per_page"
                :total="sneakers?.meta.total_items || 49214"
            />
        </main>
    </div>
</template>

<script setup lang="ts">
const user = useSupabaseUser();

interface Sneaker {
    id: number;
    colorway: string;
    image: string;
    links: string;
    name: string;
    retailPrice: number;
}

interface SneakersData {
    sneakers: Sneaker[];
    meta: {
        page: number;
        items_per_page: number;
        total_items: number;
    };
}

let baseAPIUrl = "/api/" + user.value?.id + "/collection?";

onUnmounted(() => {
    console.log("Component unmounted");
});

let { data } = await useFetch(baseAPIUrl, {
    headers: useRequestHeaders(["cookie"]),
});

const page = ref(1);
const sneakers = ref<SneakersData | null>(data.value as SneakersData);
console.log(sneakers.value);

baseAPIUrl += `page=${page.value}`;

watch(page, async (newPage) => {
    baseAPIUrl = "/api/" + user.value?.id + "/collection?";
    baseAPIUrl += `page=${newPage}`;

    let url = baseAPIUrl;
    const { data, error } = await useFetch(url, {
        headers: useRequestHeaders(["cookie"]),
    });
    if (error?.value) {
        console.error(error);
    } else {
        sneakers.value = data.value as SneakersData;
        console.log(sneakers.value);
    }
});
</script>
