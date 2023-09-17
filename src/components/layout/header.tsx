"use client";

import { UserButton } from "@clerk/clerk-react";
import { Input } from "../ui/input";
import Link from "next/link";
import { Button } from "../ui/button";
import { RiRobot2Fill } from "react-icons/ri";

const Header = () => {
	return (
		<div className="flex items-center justify-between w-full px-6 py-5">
			<div className="hidden lg:block">
				<Input placeholder="Search" size={50} />
			</div>
			<div className="lg:hidden flex items-center gap-2 min-w-[300px]">
				<Link
					href="/"
					style={{
						width: "100%",
					}}>
					<Button size="icon" className="w-full gap-2 py-6">
						<h1 className="text-2xl">
							<RiRobot2Fill />
						</h1>
						Build with AI
					</Button>
				</Link>
				<Link
					href="/collection"
					style={{
						width: "100%",
					}}>
					<Button variant="ghost" className="w-full gap-2 py-6">
						Explore
					</Button>
				</Link>
			</div>

			<UserButton
				afterSignOutUrl="/"
				appearance={{
					elements: {
						userButtonAvatarBox: "h-12 w-12",
					},
				}}
			/>
		</div>
	);
};

export default Header;
