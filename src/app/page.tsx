"use client";

import {
	AuthLoading,
	Authenticated,
	Unauthenticated,
	useMutation,
	useQuery,
} from "convex/react";
import { SignInButton } from "@clerk/clerk-react";
import { RiRobot2Fill } from "react-icons/ri";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { api } from "../../convex/_generated/api";

export default function Home() {
	const [inputValue, setInputValue] = useState("");
	const generate = useMutation(api.blueprint.generateBluePrint);
	const data = useQuery(api.blueprint.getBluePrints);

	return (
		<div className="flex flex-col w-full items-center justify-start min-h-[80vh] px-6">
			<Authenticated>
				<div className="flex items-center justify-between w-full border p-3 rounded-tl-md rounded-tr-md">
					<div className="flex flex-col items-start">
						<h1 className="text-2xl font-bold">Custom PC</h1>
						<p className="text-sm text-gray-500">
							Build your own custom PC with AI
						</p>
					</div>
				</div>
				<div className="flex flex-col items-center justify-center w-full bg-slate-50 rounded-bl-md rounded-br-md min-h-[80vh] gap-10">
					<div className="flex flex-col items-center gap-2">
						<h1 className="text-5xl text-[green]">
							<RiRobot2Fill />
						</h1>
						<h1 className="text-3xl font-bold">
							Build your own custom PC with AI
						</h1>
						<p className="text-sm text-gray-500">
							You can custom request the pc you want and we will build it for
							you
						</p>
					</div>
					<div className="flex items-center justify-center gap-3 px-10">
						<div className="border bg-white p-8 flex items-center justify-center text-center flex-col rounded-md gap-3">
							<h1 className="text-4xl text-[green] bg-slate-100 p-3 rounded-md">
								<RiRobot2Fill />
							</h1>
							<h1 className="text-xl font-bold">PC Type</h1>
							<p className="text-sm text-gray-500">
								Select the type of PC you want eg. Gaming, Workstation, etc.
							</p>
						</div>
						<div className="border bg-white p-8 flex items-center justify-center text-center flex-col rounded-md gap-3">
							<h1 className="text-4xl text-[green] bg-slate-100 p-3 rounded-md">
								<RiRobot2Fill />
							</h1>
							<h1 className="text-xl font-bold">PC Type</h1>
							<p className="text-sm text-gray-500">
								Select the type of PC you want eg. Gaming, Workstation, etc.
							</p>
						</div>
						<div className="border bg-white p-8 flex items-center justify-center text-center flex-col rounded-md gap-3">
							<h1 className="text-4xl text-[green] bg-slate-100 p-3 rounded-md">
								<RiRobot2Fill />
							</h1>
							<h1 className="text-xl font-bold">PC Type</h1>
							<p className="text-sm text-gray-500">
								Select the type of PC you want eg. Gaming, Workstation, etc.
							</p>
						</div>
					</div>
					<div className="px-6">
						<Input
							placeholder="Write type, budget, country etc."
							size={100}
							className="py-6"
							value={inputValue}
							onChange={(e) => {
								setInputValue(e.target.value);
							}}
							onKeyDown={(e) => {
								if (e.key === "Enter") {
									generate({
										prompt: inputValue,
									});
								}
							}}
						/>
					</div>
					{data?.map((item) => {
						return (
							<div
								className="flex flex-col items-center justify-center w-full bg-white rounded-md p-6 gap-3"
								key={item._id}>
								<img src={item.result} alt={item._id} />
							</div>
						);
					})}
				</div>
			</Authenticated>
			<Unauthenticated>
				<SignInButton mode="modal" />
			</Unauthenticated>
			<AuthLoading>Still loading</AuthLoading>
		</div>
	);
}
