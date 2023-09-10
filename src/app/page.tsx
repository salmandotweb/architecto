"use client";

import { AuthLoading, Authenticated, Unauthenticated } from "convex/react";
import { SignInButton } from "@clerk/clerk-react";
import { RiRobot2Fill } from "react-icons/ri";
import Link from "next/link";

const generationTypes = [
	{
		name: "Gaming Room",
		description: "Generate a room setup",
		path: "/room-setup",
	},
	{
		name: "Gaming PC",
		description: "Generate a pc setup",
		path: "/pc-setup",
	},
];

export default function Home() {
	return (
		<>
			<Authenticated>
				<div className="flex flex-col items-center gap-2">
					<h1 className="text-5xl text-primary">
						<RiRobot2Fill />
					</h1>
					<h1 className="text-3xl font-bold">
						Build your dream gaming setup with AI
					</h1>
					<p className="text-sm text-gray-500">
						You can custom request the setup you want and we will build it for
						you
					</p>
				</div>
				<div className="flex items-center justify-center gap-6 px-10 w-full">
					{generationTypes?.map((item) => {
						return (
							<Link href={item.path} key={item.name}>
								<div className="border bg-white p-8 flex items-center justify-center text-center flex-col rounded-md gap-1 min-w-[350px] transition-all hover:bg-purple-50 hover:scale-105">
									<h1 className="text-4xl text-primary p-3 rounded-md bg-purple-100">
										<RiRobot2Fill />
									</h1>
									<h1 className="text-xl font-bold mt-2">{item.name}</h1>
									<p className="text-sm text-gray-500">{item.description}</p>
								</div>
							</Link>
						);
					})}
				</div>
			</Authenticated>
			<Unauthenticated>
				<SignInButton mode="modal" />
			</Unauthenticated>
			<AuthLoading>Still loading</AuthLoading>
		</>
	);
}
