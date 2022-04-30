import Image from "next/image";
import React, { useState } from "react";
import {
	SearchIcon,
	GlobeAltIcon,
	MenuIcon,
	UserCircleIcon,
	UsersIcon,
} from "@heroicons/react/solid";
import { useRouter } from "next/router";
import Calendar from "./Calendar.jsx";

interface HeaderProps {
	placeholder?: string;
}

const Header: React.FC<HeaderProps> = ({ placeholder }) => {
	const [searchInput, setSearchInput] = useState("");
	const [numberOfGuests, setNumberOfGuests] = useState(1);
	const [startDate, setStartDate] = useState(new Date());
	const [endDate, setEndDate] = useState(new Date());
	const router = useRouter();

	const search = () => {
		router.push({
			pathname: "/search",
			query: {
				location: searchInput,
				startDate: startDate.toISOString(),
				endDate: endDate.toISOString(),
				numberOfGuests,
			},
		});
		setSearchInput("");
	};

	return (
		<header className="md:px10 sticky top-0 z-50 grid grid-cols-3 bg-white p-5 shadow-md">
			{/* Left - Logo */}
			<div
				className="relative my-auto flex h-10 cursor-pointer items-center"
				onClick={() => router.push("/")}
			>
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
					placeholder={placeholder || "Start your search"}
					className="flex-grow bg-transparent pl-5 text-sm text-gray-600 placeholder-gray-400 outline-none"
					value={searchInput}
					onChange={(e) => setSearchInput(e.target.value)}
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

			{/* DatePicker */}
			{searchInput && (
				<div className="col-span-3 mx-auto flex flex-col">
					<Calendar
						startDate={startDate}
						setStartDate={setStartDate}
						endDate={endDate}
						setEndDate={setEndDate}
					/>
					<div className="mb-4 flex items-center border-b">
						<h2 className="flex-grow text-2xl font-semibold">
							Number of Guests
						</h2>
						<UsersIcon className="h-5" />
						<input
							type="number"
							className="w-12 pl-2 text-lg text-red-400 outline-none"
							value={numberOfGuests}
							onChange={(e) =>
								setNumberOfGuests(parseInt(e.target.value))
							}
							min={1}
						/>
					</div>
					<div className="flex">
						<button
							className="flex-grow text-gray-500"
							onClick={() => setSearchInput("")}
						>
							Cancel
						</button>
						<button
							className="flex-grow text-red-400"
							onClick={search}
						>
							Search
						</button>
					</div>
				</div>
			)}
		</header>
	);
};

export default Header;
