"use client";

import "./globals.css";
import { Manrope } from "next/font/google";
import ConvexClientProvider from "./ConvexClientProvider";
import { ThemeProvider } from "@/components/theme-provider";
import Sidebar from "@/components/layout/sidebar";
import Header from "@/components/layout/header";
import { AuthLoading, Authenticated, Unauthenticated } from "convex/react";
import { SignInButton } from "@clerk/clerk-react";
import Loading from "./loading";
import { Button } from "@/components/ui/button";

const manrope = Manrope({
	subsets: ["latin"],
});

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={manrope.className}>
				<ThemeProvider attribute="class" defaultTheme="light" enableSystem>
					<ConvexClientProvider>
						<div className="flex items-start w-full">
							<Sidebar />
							<div className="flex flex-col items-start w-full">
								<Header />
								<div className="flex flex-col w-full items-center justify-start min-h-[80vh] px-6">
									<div className="flex items-center justify-between w-full border p-3 rounded-tl-md rounded-tr-md">
										<div className="flex flex-col items-start">
											<h1 className="text-2xl font-bold">
												Welcome to{" "}
												<span className="text-primary">Architecto AI</span>
											</h1>
											<p className="text-sm text-gray-500">
												Build your dream gaming setup with AI{" "}
											</p>
										</div>
									</div>
									<div className="flex flex-col items-center justify-center w-full bg-slate-50 rounded-bl-md rounded-br-md min-h-[80vh] gap-10">
										<Authenticated>{children}</Authenticated>
										<Unauthenticated>
											<Button variant="outline">
												<SignInButton mode="modal" />
											</Button>
										</Unauthenticated>
										<AuthLoading>
											<Loading />
										</AuthLoading>
									</div>
								</div>
							</div>
						</div>
					</ConvexClientProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
