"use client";

import { useUser } from "@clerk/clerk-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Input } from "../ui/input";

const Header = () => {
	const user = useUser();
	return (
		<div className="flex items-center justify-between w-full px-6 py-5">
			<div>
				<Input placeholder="Search" size={50} />
			</div>
			<Avatar>
				<AvatarImage src={user.user?.imageUrl} />
				<AvatarFallback>{user.user?.firstName?.slice(0, 2)}</AvatarFallback>
			</Avatar>
		</div>
	);
};

export default Header;
