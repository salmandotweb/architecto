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
		<div className="flex flex-col gap-6 mx-auto items-center justify-start w-[60%] mt-10 pb-4">
			<div className="flex items-end justify-between gap-2 w-full">
				<div className="flex items-start gap-2 flex-col">
					<h1 className="text-2xl font-bold">Your Room Setup</h1>
					<p className="text-sm text-gray-500">
						Here is your room setup based on your preferences
					</p>
				</div>
				<Link href="/">
					<Button>
						New Setup <GiMagicBroom />
					</Button>
				</Link>
			</div>
			<div className="flex items-start flex-col w-full gap-4">
				{getRoomSetup?.result && (
					<img src={getRoomSetup?.result[0]} alt={getRoomSetup.roomType} />
				)}
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
