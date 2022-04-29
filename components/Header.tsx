import Image from "next/image";
import React from "react";
import {
	SearchIcon,
	GlobeAltIcon,
	MenuIcon,
	UserCircleIcon,
	UsersIcon,
} from "@heroicons/react/solid";

const Header = () => {
	return (
		<header className="md:px10 sticky top-0 z-50 grid grid-cols-3 bg-white p-5 shadow-md">
			{/* Left - Logo */}
			<div className="relative my-auto flex h-10 cursor-pointer items-center">
				<Image
					src="https://links.papareact.com/qd3"
					alt="Airbnb"
					layout="fill"
					objectFit="contain"
					objectPosition="left"
				/>
			</div>

			{/* Middle - Search */}
			<div className="flex items-center rounded-full py-2 md:border-2 md:shadow-md">
				<input
					type="text"
					placeholder="Start your search"
					className="flex-grow bg-transparent pl-5 text-sm text-gray-600 placeholder-gray-400 outline-none"
				/>
				<SearchIcon className="mx-2 hidden h-8 cursor-pointer rounded-full bg-red-400 p-2 text-white md:inline-flex" />
			</div>

			{/* Right - Buttons */}
			<div className="flex items-center justify-end space-x-4 text-gray-500">
				<p className="hidden cursor-pointer md:inline-flex">
					Become a host
				</p>
				<GlobeAltIcon className="h-6" />
				<div className="flex items-center space-x-2 rounded-full border-2 p-2">
					<MenuIcon className="h-6" />
					<UserCircleIcon className="h-6" />
				</div>
			</div>
		</header>
	);
};

export default Header;
