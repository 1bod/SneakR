import { serverSupabaseClient } from "#supabase/server";
import { PostgrestSingleResponse } from "@supabase/supabase-js";

const prepareQuery = (inputQuery: string) => {
    if (!inputQuery) return "";
    const query = `%${inputQuery}%`;
    return query;
};

export default eventHandler(async (event) => {
    const client = await serverSupabaseClient(event);
    const urlString = event.node.req.url;
    const paramString = urlString?.split("?")[1];
    const queryString = new URLSearchParams(paramString);
    let fullIDList;

    console.log("requested", urlString);

    let items_per_page = 26;
    let page = 1;
    let query = "";

    items_per_page = queryString.get("items_per_page")
        ? parseInt(queryString.get("items_per_page") as string)
        : items_per_page;
    page = queryString.get("page")
        ? parseInt(queryString.get("page") as string)
        : page;
    query = queryString.get("query")
        ? (queryString.get("query") as string)
        : query;

    query = prepareQuery(query);

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

    if (query) {
        console.log("query", query);
        fullIDList = await client
            .from("sneakers")
            .select("id")
            .ilike("name", query);

        data = await client
            .from("sneakers")
            .select("id, brand, colorway, image, links, name, retailPrice")
            .ilike("name", query)
            .range(
                page * items_per_page - items_per_page,
                page * items_per_page - 1
            );
    } else {
        fullIDList = await client.from("sneakers").select("id");
        data = await client
            .from("sneakers")
            .select("id, brand, colorway, image, links, name, retailPrice")
            .range(
                page * items_per_page - items_per_page,
                page * items_per_page - 1
            );
    }

    const convertedData =
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
