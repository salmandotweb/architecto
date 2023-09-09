import "./globals.css";
import { Manrope } from "next/font/google";
import ConvexClientProvider from "./ConvexClientProvider";
import { ThemeProvider } from "@/components/theme-provider";
import Sidebar from "@/components/layout/sidebar";
import Header from "@/components/layout/header";

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
								{children}
							</div>
						</div>
					</ConvexClientProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
