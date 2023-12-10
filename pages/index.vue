<template>
    <div>
        <HeroComponent>
            <template #title> SneakR </template>
            <template #description>
                Search for your favorite sneakers
            </template>
        </HeroComponent>
        <main class="mx-auto min-h-[90vh] w-full xl:w-10/12">
            <SearchBar
                :model-query="query"
                @update:model-value="(newValue: string) => query = newValue"
            />
            <SneakerList :sneaker-list="sneakers?.sneakers" />
            <UPagination
                class="mx-auto w-full justify-center"
                v-model="page"
                :page-count="sneakers?.meta.items_per_page"
                :total="sneakers?.meta.total_items || 49214"
            />
        </main>
    </div>
</template>

<script setup lang="ts">
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

let baseAPIUrl = "/api/sneakers?";

onUnmounted(() => {
    console.log("Component unmounted");
});

let { data } = await useFetch(baseAPIUrl, {
    headers: useRequestHeaders(["cookie"]),
});

const page = ref(1);
const query = ref("");
const sneakers = ref<SneakersData | null>(data.value as SneakersData);
console.log(sneakers.value);

baseAPIUrl += `?page=${page.value}`;

watch(page, async (newPage) => {
    baseAPIUrl = "/api/sneakers?";
    baseAPIUrl += `page=${newPage}`;

    let url = baseAPIUrl;
    if (query.value) {
        if (!url.endsWith("?")) {
            url += "&";
        }
        url += `query=${query.value}`;
    }
    const { data, error } = await useFetch(url, {
        headers: useRequestHeaders(["cookie"]),
    });
    if (error?.value) {
        console.log(error);
    } else {
        sneakers.value = data.value as SneakersData;
        console.log(sneakers.value);
    }
});

watch(query, async (newQuery) => {
    page.value = 1;
    let url = baseAPIUrl;
    if (newQuery) {
        if (!url.endsWith("?")) {
            url += "&";
        }
        url += `query=${newQuery}`;
    }
    const { data, error } = await useFetch(url, {
        headers: useRequestHeaders(["cookie"]),
    });
    if (error?.value) {
        console.log(error);
    } else {
        sneakers.value = data.value as SneakersData;
        console.log(sneakers.value);
    }
});
</script>
