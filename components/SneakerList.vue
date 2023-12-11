<template>
    <div class="flex flex-wrap justify-between">
        <SneakerCard
            v-for="sneaker in sneakerList"
            :sneaker="sneaker"
            :key="sneaker.id"
            class="sm:mx-auto"
            @collection="(s) => collection(s)"
            @wishlist="(s) => wishlist(s)"
            :in-collection="
                user?.user_metadata.collection?.includes(sneaker.id)
            "
            :in-wishlist="user?.user_metadata.wishlist?.includes(sneaker.id)"
        />
    </div>
</template>

<script setup lang="ts">
defineProps(["sneakerList"]);

interface Sneaker {
    id: number;
    colorway: string;
    image: string;
    links: string;
    name: string;
    retailPrice: number;
}

const supabase = useSupabaseClient();
const user = useSupabaseUser();

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
</script>
