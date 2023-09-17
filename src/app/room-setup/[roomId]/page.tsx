"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Loader from "@/components/loader";

export default function Page({ params }: { params: { roomId: string } }) {
	const getRoomSetup = useQuery(api.generate.getRoomSetup, {
		roomId: params.roomId as Id<"rooms">,
	});

	return getRoomSetup?.result ? (
		<div className="flex flex-col gap-6 mx-auto items-center justify-start w-[100%] mt-10 pb-4 lg:w-[80%]">
			<div className="flex items-end justify-between gap-2 w-full">
				<div className="flex items-start gap-2 flex-col">
					<h1 className="text-2xl font-bold">{getRoomSetup?.setupName}</h1>
					<p className="text-sm text-gray-500">
						Here is your room setup based on your preferences
					</p>
				</div>
			</div>
			<div className="flex items-start flex-col w-full gap-4">
				<div className="w-full">
					{getRoomSetup?.result &&
						getRoomSetup?.result?.map((result, index) => {
							return (
								<img
									key={index}
									src={result}
									alt={getRoomSetup.roomType}
									style={{
										objectFit: "contain",
										width: "100%",
									}}
								/>
							);
						})}
				</div>
				{getRoomSetup?.markdownResponse && (
					<ReactMarkdown remarkPlugins={[remarkGfm]}>
						{getRoomSetup?.markdownResponse}
					</ReactMarkdown>
				)}
			</div>
		</div>
	) : (
		<Loader />
	);
}
