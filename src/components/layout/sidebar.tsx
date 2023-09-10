"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { RiRobot2Fill } from "react-icons/ri";
import { Badge } from "../ui/badge";
import { LuLayoutDashboard } from "react-icons/lu";
import { BsCollection } from "react-icons/bs";
import { HiOutlineBuildingStorefront } from "react-icons/hi2";
import { GiFallingStar } from "react-icons/gi";

const sidebarLinks = [
	{
		name: "Dashboard",
		icon: <LuLayoutDashboard />,
		path: "/",
	},
	{
		name: "Collection",
		icon: <BsCollection />,
		path: "/collection",
	},
	{
		name: "Marketplace",
		icon: <HiOutlineBuildingStorefront />,
		path: "/marketplace",
	},
	{
		name: "Dreamspace",
		icon: <GiFallingStar />,
		path: "/dreamspace",
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
						<RiRobot2Fill />
						Build with AI
						<Badge
							variant="default"
							className="bg-white hover:bg-white text-primary rounded-xl">
							New
						</Badge>
					</Button>
				</Link>
			</div>
			<div className="flex items-start justify-start p-6 border-b w-full flex-col gap-3">
				<h1 className="text-base text-[#5c5c5c] font-medium">Menu</h1>
				<div className="flex flex-col items-start justify-start w-full gap-2">
					{sidebarLinks.map((link, index) => {
						return (
							<Link
								href={link.path}
								key={index}
								style={{
									width: "100%",
								}}>
								<Button
									size="icon"
									variant="ghost"
									className="w-full gap-2 py-5 flex items-center justify-start text-start text-[16px] pl-2">
									{link.icon}
									{link.name}
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
