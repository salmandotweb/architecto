"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useRouter } from "next/navigation";

export default function CollectionPage() {
	const getCollection = useQuery(api.generate.getRoomSetups);

	// function which capitalizes all the first letters of a string
	function capitalizeFirstLetter(string: string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	const router = useRouter();

	return (
		<div className="flex items-center gap-6 justify-start w-[80%] flex-wrap pt-[40px] pb-[20px]">
			{getCollection
				? getCollection?.map((item, index) => {
						return (
							<div
								className="flex flex-col gap-2 min-w-[30%] bg-white rounded-md overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:scale-105 transition-all cursor-pointer"
								key={index}
								onClick={() => {
									router.push(`/room-setup/${item._id}`);
								}}>
								{item.result && (
									<img
										src={item.result[0]}
										alt={item.roomType}
										style={{
											objectFit: "cover",
											width: "100%",
											height: "250px",
										}}
									/>
								)}
								<div className="p-4 flex flex-col items-start gap-2">
									<h1 className="text-xl font-bold">
										{capitalizeFirstLetter(item.roomType)}
									</h1>
								</div>
							</div>
						);
				  })
				: "Loading..."}
		</div>
	);
}
