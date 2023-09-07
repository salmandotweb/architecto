"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation, useQuery } from "convex/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { api } from "../../convex/_generated/api";

type Inputs = {
	prompt: string;
};

export default function Home() {
	const generateBluePrint = useMutation(api.prompt.generateBluePrint);

	const prompts = useQuery(api.prompt.getPrompts);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<Inputs>();
	const onSubmit: SubmitHandler<Inputs> = (data) => {
		return (
			generateBluePrint({
				prompt: data.prompt ?? "",
			}),
			reset()
		);
	};

	return (
		<div className="flex flex-col w-full items-center justify-center min-h-screen">
			<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
				<Input
					{...register("prompt", {
						required: true,
					})}
				/>

				<Button type="submit">Submit</Button>

				{errors.prompt && (
					<span className="text-[#000] text-[12px]">
						{errors.prompt.type === "required" && "Prompt is required"}
					</span>
				)}
			</form>

			<div className="flex flex-col gap-2 mt-2">
				{prompts?.map((prompt) => {
					return <div key={prompt._id}>{prompt.prompt}</div>;
				})}
			</div>
		</div>
	);
}
