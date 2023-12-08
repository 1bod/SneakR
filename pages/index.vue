<template>
    <div>
        <SearchBar
            :model-query="query"
            @update:model-value="(newValue: string) => query = newValue"
        />
        <div class="flex flex-wrap justify-between">
            <SneakerCard
                v-for="sneaker in sneakers?.sneakers"
                :sneaker="sneaker"
                :key="sneaker.id"
            />
        </div>
        <UPagination
            v-model="page"
            :page-count="sneakers?.meta.items_per_page"
            :total="sneakers?.meta.total_items || 49214"
        />
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
