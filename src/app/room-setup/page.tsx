"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { BiRightArrowAlt } from "react-icons/bi";
import { BsArrowLeftShort } from "react-icons/bs";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { GiMagicBroom } from "react-icons/gi";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useRouter } from "next/navigation";

const roomTypes = [
	{
		name: "Gaming",
		type: "online gaming",
		image:
			"https://images.unsplash.com/photo-1603481588273-2f908a9a7a1b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
	},
	{
		name: "Streaming",
		type: "live streaming",
		image:
			"https://images.unsplash.com/photo-1598550473359-433795503a0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
	},
	{
		name: "Office",
		type: "office workstation",
		image:
			"https://images.unsplash.com/photo-1462826303086-329426d1aef5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
	},
];

const colors = [
	{
		name: "Red",
		color: "#EF4444",
	},
	{
		name: "Blue",
		color: "#3B82F6",
	},
	{
		name: "Green",
		color: "#10B981",
	},
	{
		name: "Yellow",
		color: "#FBBF24",
	},
	{
		name: "Purple",
		color: "#8B5CF6",
	},
	{
		name: "Pink",
		color: "#EC4899",
	},
	{
		name: "Orange",
		color: "#F97316",
	},
	{
		name: "Indigo",
		color: "#6366F1",
	},
	{
		name: "Teal",
		color: "#14B8A6",
	},
	{
		name: "Cyan",
		color: "#06B6D4",
	},
	{
		name: "Lime",
		color: "#84CC16",
	},
];

const Page = () => {
	const [step, setStep] = useState(1);
	const [roomId, setRoomId] = useState("");
	const [room, setRoom] = useState({
		type: {
			name: "",
			type: "",
			image: "",
		},
		budget: "",
		color: "",
	});

	const generateRoomSetup = useMutation(api.generate.generateRoomSetup);

	const router = useRouter();

	const handleGeneration = async () => {
		// const response = await generateRoomSetup({
		// 	roomType: room.type.type,
		// 	budget: room.budget,
		// 	color: room.color,
		// });
		// setRoomId(response);

		router.push(`/room-setup/${roomId}`);
	};

	return (
		<>
			{step === 1 && (
				<div className="flex flex-col items-center text-center gap-2 w-full">
					<h1 className="text-4xl font-bold">Select Setup Type</h1>
					<p className="text-sm text-gray-500">
						Select the type of setup you want to create
					</p>
					<div className="flex items-center justify-center gap-6 w-full mt-4">
						{roomTypes?.map((item) => {
							return (
								<div
									key={item.name}
									className={`border bg-white flex items-center justify-center text-center flex-col rounded-md gap-1 min-w-[350px] transition-all hover:bg-purple-50 hover:scale-105 relative h-[250px] overflow-hidden cursor-pointer hover:shadow-2xl shadow-inherit`}
									onClick={() => {
										setRoom((prev) => {
											return {
												...prev,
												type: {
													name: item.name,
													type: item.type,
													image: item.image,
												},
											};
										});
									}}>
									<img
										src={item.image}
										alt={item.name}
										className="w-full h-full object-cover"
									/>
									<div
										className={`absolute inset-0 bg-gradient-to-b from-transparent ${
											room.type.type === item.type
												? "to-purple-800"
												: "to-black"
										} opacity-70`}></div>
									<div className="absolute inset-0 flex items-center justify-center">
										<p className="text-white text-2xl font-bold">{item.name}</p>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			)}
			{step === 2 && (
				<div className="flex flex-col gap-6 mx-auto items-center justify-start w-[60%]">
					<div className="w-full flex justify-start items-center gap-4">
						<Button
							variant="ghost"
							size="icon"
							className="text-4xl"
							onClick={() => {
								setStep((prev) => {
									return prev - 1;
								});
							}}>
							<BsArrowLeftShort />
						</Button>
						<h1 className="text-2xl font-bold">Back</h1>
					</div>
					<div
						className={`border bg-white flex w-full items-center justify-center text-center flex-col rounded-md gap-1 transition-all hover:bg-purple-50 relative h-[300px] overflow-hidden`}>
						<img
							src={room.type.image}
							alt={room.type.name}
							className="w-full h-full object-cover"
						/>
						<div
							className={`absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-70`}></div>
						<div className="absolute inset-0 flex items-center justify-center">
							<p className="text-white text-2xl font-bold">{room.type.name}</p>
						</div>
					</div>
					<div className="w-full flex flex-col gap-3 items-start">
						<Label htmlFor="budget">
							How much are you willing to spend on your setup?
						</Label>
						<Input
							id="budget"
							type="number"
							placeholder="$5000"
							value={room.budget}
							onChange={(e) => {
								setRoom((prev) => {
									return {
										...prev,
										budget: e.target.value,
									};
								});
							}}
						/>
					</div>
					<div className="w-full flex flex-col gap-3 items-start">
						<Label htmlFor="budget">Select a theme for your room</Label>
						<div className="flex items-center w-full gap-2 flex-wrap">
							{colors.map((color) => {
								return (
									<TooltipProvider key={color.color}>
										<Tooltip>
											<TooltipTrigger>
												<div
													style={{ backgroundColor: `${color.color}` }}
													className={`w-7 h-7 rounded-full cursor-pointer ${
														color.name === room.color
															? "scale-105 ring-2 ring-purple-600"
															: ""
													}`}
													onClick={() => {
														setRoom((prev) => {
															return {
																...prev,
																color: color.name,
															};
														});
													}}
												/>
											</TooltipTrigger>
											<TooltipContent className="bg-slate-800">
												{color.name}
											</TooltipContent>
										</Tooltip>
									</TooltipProvider>
								);
							})}
						</div>
					</div>

					<Button
						onClick={handleGeneration}
						disabled={!room.color || !room.budget}
						size="sm"
						variant="default"
						className="mr-auto flex items-center gap-2">
						Create Magic <GiMagicBroom />
					</Button>
				</div>
			)}

			<div
				className={`flex items-center justify-center gap-6 w-full ${
					room.type.type && step === 1 ? "visible" : "invisible"
				}`}>
				<Button
					onClick={() => {
						setStep((prev) => {
							return prev + 1;
						});
					}}
					variant="secondary"
					className="flex items-center gap-1 hover:bg-purple-100 transition-all">
					Next <BiRightArrowAlt />
				</Button>
			</div>
		</>
	);
};

export default Page;
