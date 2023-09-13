"use client";

import { Input } from "@/components/ui/input";
import { useMutation } from "convex/react";
import { useState } from "react";
import { api } from "../../../convex/_generated/api";
import { Button } from "@/components/ui/button";

const Page = () => {
	const [file, setFile] = useState<File | null>(null);

	const generateUploadUrl = useMutation(api.generate.generateUploadUrl);
	const sendImage = useMutation(api.generate.sendImage);

	const handleSend = async () => {
		try {
			if (!file) {
				return;
			}

			const postUrl = await generateUploadUrl();

			const result = await fetch(postUrl, {
				method: "POST",
				headers: { "Content-Type": file!.type },
				body: file,
			});

			const { storageId } = await result.json();

			await sendImage({ storageId });
		} catch (error) {
			console.error(error);
			return null;
		}
	};

	return (
		<div>
			<Input
				type="file"
				onChange={(e) => {
					if (e.target.files) {
						setFile(e.target.files[0]);
					}
				}}
			/>

			<Button onClick={handleSend}>Send</Button>
		</div>
	);
};

export default Page;
