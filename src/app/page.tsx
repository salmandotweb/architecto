"use client";

import { AuthLoading, Authenticated, Unauthenticated } from "convex/react";

import { SignInButton } from "@clerk/clerk-react";

export default function Home() {
	return (
		<div className="flex flex-col w-full items-center justify-center min-h-screen">
			<Authenticated>Authenticated</Authenticated>
			<Unauthenticated>
				<SignInButton mode="modal" />
			</Unauthenticated>
			<AuthLoading>Still loading</AuthLoading>
		</div>
	);
}
