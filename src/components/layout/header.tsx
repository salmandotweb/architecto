"use client";

import { UserButton } from "@clerk/clerk-react";
import { Input } from "../ui/input";

const Header = () => {
	return (
		<div className="flex items-center justify-between w-full px-6 py-5">
			<div>
				<Input placeholder="Search" size={50} />
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
