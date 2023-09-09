import "./globals.css";
import { Manrope } from "next/font/google";
import ConvexClientProvider from "./ConvexClientProvider";
import { ThemeProvider } from "@/components/theme-provider";
import Sidebar from "@/components/layout/sidebar";

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
						<div className="flex items-start">
							<Sidebar />
							{children}
						</div>
					</ConvexClientProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
