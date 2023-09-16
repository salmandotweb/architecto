"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { RiRobot2Fill } from "react-icons/ri";
import { LuLayoutDashboard } from "react-icons/lu";
import { BsCollection } from "react-icons/bs";
import { GiFallingStar } from "react-icons/gi";
import { Badge } from "../ui/badge";
import { MdOutlineCollectionsBookmark } from "react-icons/md";

const sidebarLinks = [
	{
		name: "Home",
		icon: <LuLayoutDashboard />,
		path: "/",
	},
	{
		name: "Explore",
		icon: <BsCollection />,
		path: "/collection",
	},
	{
		name: "My Collection",
		icon: <MdOutlineCollectionsBookmark />,
		path: "/collection",
	},
	{
		name: "Favourites",
		icon: <GiFallingStar />,
		path: "/davourites",
		comingSoon: true,
	},
];

const Sidebar = () => {
	return (
		<div className="flex flex-col items-start justify-start min-h-screen min-w-[300px] border-r">
			<div className="flex items-start justify-start p-6 border-b w-full">
				<h1 className="text-2xl font-bold">Architecto</h1>
			</div>
			<div className="flex items-start justify-start px-6 py-3 border-b w-full">
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
			</div>
			<div className="flex items-start justify-start p-6 border-b w-full flex-col gap-3">
				<h1 className="text-base text-[#5c5c5c] font-medium">Menu</h1>
				<div className="flex flex-col items-start justify-start w-full gap-2">
					{sidebarLinks.map((link, index) => {
						return (
							<Link
								href={link.comingSoon ? "#" : link.path}
								key={index}
								style={{
									width: "100%",
								}}>
								<Button
									size="icon"
									variant="ghost"
									disabled={link.comingSoon}
									className="w-full gap-2 py-5 flex items-center justify-start text-start text-[16px] pl-2">
									{link.icon}
									{link.name}
									{link.comingSoon && <Badge variant="secondary">Soon</Badge>}
								</Button>
							</Link>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default Sidebar;
