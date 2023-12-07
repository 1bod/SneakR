import { serverSupabaseClient } from "#supabase/server";
import { PostgrestSingleResponse } from "@supabase/supabase-js";

export default eventHandler(async (event) => {
    const client = await serverSupabaseClient(event);
    let urlString = event.node.req.url;
    let paramString = urlString?.split("?")[1];
    let queryString = new URLSearchParams(paramString);

    let items_per_page = 25
    let page = 1

    items_per_page = queryString.get("items_per_page") ? parseInt(queryString.get("items_per_page") as string) : items_per_page
    page = queryString.get("page") ? parseInt(queryString.get("page") as string) : page

    const {
        data,
    }: PostgrestSingleResponse<
        {
            id: number;
            colorway: string;
            image: string;
            links: string;
            name: string;
            retailPrice: number;
        }[]
    > = await client
        .from("sneakers")
        .select("id, colorway, image, links, name, retailPrice")
        .range(
            page * items_per_page - items_per_page,
            page * items_per_page - 1
        );

    const convertedData = data?.map((item) => {
        return {
            ...item,
            image: JSON.parse(item.image.replace(/'/g, '"')),
            links: JSON.parse(item.links.replace(/'/g, '"'))
        };
    });

    console.log("sent", convertedData);

    return { sneakers: convertedData };
});
