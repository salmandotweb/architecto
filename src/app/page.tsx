"use client";

import { RiRobot2Fill } from "react-icons/ri";
import Link from "next/link";

const generationTypes = [
	{
		name: "Room Setup",
		description: "Generate a room setup",
		path: "/room-setup",
	},
	{
		name: "Improve existing setup",
		description: "Improve your existing setup",
		path: "/",
		comingSoon: true,
	},
];

export default function Home() {
	return (
		<>
			<div className="flex flex-col items-center gap-2">
				<h1 className="text-5xl text-primary">
					<RiRobot2Fill />
				</h1>
				<h1 className="text-3xl font-bold">
					Build your dream gaming setup with AI
				</h1>
				<p className="text-sm text-gray-500">
					You can custom request the setup you want and we will build it for you
				</p>
			</div>
			<div className="flex items-center justify-center gap-6 px-10 w-full">
				{generationTypes?.map((item) => {
					return (
						<Link href={item.path} key={item.name}>
							<div className="relative border bg-white p-8 flex items-center justify-center text-center flex-col rounded-md gap-1 min-w-[350px] transition-all hover:bg-purple-50 hover:scale-105 group">
								{/* Original Content */}
								<h1 className="text-4xl text-primary p-3 rounded-md bg-purple-100">
									<RiRobot2Fill />
								</h1>
								<h1 className="text-xl font-bold mt-2">{item.name}</h1>
								<p className="text-sm text-gray-500">{item.description}</p>

								{item.comingSoon && (
									<div className="absolute inset-0 flex items-center justify-center transition-opacity opacity-0 group-hover:opacity-100 bg-black bg-opacity-60">
										<p className="text-white text-xl font-medium">
											Coming Soon
										</p>
									</div>
								)}
							</div>
						</Link>
					);
				})}
			</div>
		</>
	);
}
