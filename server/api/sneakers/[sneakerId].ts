import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { serverSupabaseClient } from "#supabase/server";

export default eventHandler(async (event) => {
	const client = await serverSupabaseClient(event);

	const {
		data,
		error,
	}: PostgrestSingleResponse<
		{
			UID: string;
			brand: string;
			colorway: string;
			createdAt: string;
			estimatedMarketValue: number;
			gender: string;
			id: number;
			image: string;
			links: string;
			name: string;
			publishedAt: string;
			releaseDate: string;
			releaseYear: number;
			retailPrice: number;
			silhouette: string;
			sku: string;
			story: null | string;
			updatedAt: string;
		}[]
	> = await client
		.from("sneakers")
		.select()
		.eq("id", getRouterParam(event, "sneakerId") as string);
	if (error) {
		console.error(error);
		return error;
	}
		console.log(data);
	data[0].image = JSON.parse(data[0].image.replace(/'/g, '"'));
	data[0].links = JSON.parse(data[0].links.replace(/'/g, '"'));
	return data[0];
});
