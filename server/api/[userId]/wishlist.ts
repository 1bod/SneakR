import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { useRoute } from "vue-router";

export default eventHandler(async (event) => {
    const client = await serverSupabaseClient(event);
    const user = await serverSupabaseUser(event);
    let urlString = event.node.req.url;
    let paramString = urlString?.split("?")[1];
    let queryString = new URLSearchParams(paramString);

    let data: PostgrestSingleResponse<
        {
            id: number;
            colorway: string;
            image: string;
            links: string;
            name: string;
            retailPrice: number;
        }[]
    >;

    let items_per_page = 26;
    let page = 1;

    items_per_page = queryString.get("items_per_page")
        ? parseInt(queryString.get("items_per_page") as string)
        : items_per_page;
    page = queryString.get("page")
        ? parseInt(queryString.get("page") as string)
        : page;
        console.log("wishlist", user?.user_metadata.wishlist);

    let fullIDList = await client
        .from("sneakers")
        .select("id")
        .in("id", user?.user_metadata.wishlist);

    data = await client
        .from("sneakers")
        .select("id, brand, colorway, image, links, name, retailPrice")
        .in("id", user?.user_metadata.wishlist)
        .range(
            page * items_per_page - items_per_page,
            page * items_per_page - 1
        );

    let convertedData =
        data?.data?.map((item) => {
            return {
                ...item,
                image: JSON.parse(item.image.replace(/'/g, '"')),
                links: JSON.parse(item.links.replace(/'/g, '"')),
            };
        }) || [];

    console.log("sent", convertedData);

    return {
        sneakers: convertedData,
        meta: {
            page: page,
            items_per_page: items_per_page,
            total_items: fullIDList.data?.length,
        },
    };
});
