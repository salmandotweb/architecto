"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GiMagicBroom } from "react-icons/gi";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function Page({ params }: { params: { roomId: string } }) {
	const getRoomSetup = useQuery(api.generate.getRoomSetup, {
		roomId: params.roomId as Id<"rooms">,
	});
	return (
		<div className="flex flex-col gap-6 mx-auto items-center justify-start w-[80%] mt-10 pb-4">
			<div className="flex items-end justify-between gap-2 w-full">
				<div className="flex items-start gap-2 flex-col">
					<h1 className="text-2xl font-bold">{getRoomSetup?.setupName}</h1>
					<p className="text-sm text-gray-500">
						Here is your room setup based on your preferences
					</p>
				</div>
				<Link href="/">
					<Button className="flex gap-2">
						New Setup <GiMagicBroom />
					</Button>
				</Link>
			</div>
			<div className="flex items-start flex-col w-full gap-4">
				<div className="grid grid-cols-2 gap-4 w-full">
					{getRoomSetup?.result &&
						getRoomSetup?.result?.map((result) => {
							return (
								<img
									src={result}
									alt={getRoomSetup.roomType}
									style={{
										objectFit: "cover",
										width: "100%",
										height: "500px",
									}}
								/>
							);
						})}
				</div>
				{getRoomSetup?.markdownResponse && (
					<ReactMarkdown
						children={getRoomSetup?.markdownResponse}
						remarkPlugins={[remarkGfm]}
					/>
				)}
			</div>
		</div>
	);
}