import Image from "next/image";
import React, { useState } from "react";
import {
	SearchIcon,
	GlobeAltIcon,
	MenuIcon,
	UserCircleIcon,
	UsersIcon,
} from "@heroicons/react/solid";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRangePicker, createStaticRanges } from "react-date-range";
import {
	addDays,
	endOfDay,
	startOfDay,
	startOfMonth,
	endOfMonth,
	addMonths,
	startOfWeek,
	endOfWeek,
	startOfTomorrow,
	endOfTomorrow,
} from "date-fns";
import { useRouter } from "next/router";

interface HeaderProps {
	placeholder?: string;
}

interface IsSelectedRange {
	startDate: { getTime: () => number };
	endDate: { getTime: () => number };
}

const defineds = {
	endOfWeek: endOfWeek(new Date()),
	startOfToday: startOfDay(new Date()),
	endOfToday: endOfDay(new Date()),
	endOfMonth: endOfMonth(new Date()),
	startOfTomorrow: startOfTomorrow(),
	endOfTomorrow: endOfTomorrow(),
	startOfNextWeek: startOfWeek(addDays(new Date(), 7)),
	endOfNextWeek: endOfWeek(addDays(new Date(), 7)),
	startOfNextMonth: startOfMonth(addMonths(new Date(), 1)),
	endOfNextMonth: endOfMonth(addMonths(new Date(), 1)),
};

const customStaticRanges = [
	{
		label: "Today",
		range: function range() {
			return {
				startDate: defineds.startOfToday,
				endDate: defineds.endOfToday,
			};
		},
		isSelected: (range: IsSelectedRange) =>
			range.startDate.getTime() === defineds.startOfToday.getTime() &&
			range.endDate.getTime() === defineds.endOfToday.getTime(),
	},
	{
		label: "Tomorrow",
		range: function range() {
			return {
				startDate: defineds.startOfTomorrow,
				endDate: defineds.endOfTomorrow,
			};
		},
		isSelected: (range: IsSelectedRange) =>
			range.startDate.getTime() === defineds.startOfTomorrow.getTime() &&
			range.endDate.getTime() === defineds.endOfTomorrow.getTime(),
	},
	{
		label: "This Week",
		range: function range() {
			return {
				startDate: defineds.startOfToday,
				endDate: defineds.endOfWeek,
			};
		},
		isSelected: (range: IsSelectedRange) =>
			range.startDate.getTime() === defineds.startOfToday.getTime() &&
			range.endDate.getTime() === defineds.endOfWeek.getTime(),
	},
	{
		label: "Next Week",
		range: function range() {
			return {
				startDate: defineds.startOfNextWeek,
				endDate: defineds.endOfNextWeek,
			};
		},
		isSelected: (range: IsSelectedRange) =>
			range.startDate.getTime() === defineds.startOfNextWeek.getTime() &&
			range.endDate.getTime() === defineds.endOfNextWeek.getTime(),
	},
	{
		label: "This Month",
		range: function range() {
			return {
				startDate: defineds.startOfToday,
				endDate: defineds.endOfMonth,
			};
		},
		isSelected: (range: IsSelectedRange) =>
			range.startDate.getTime() === defineds.startOfToday.getTime() &&
			range.endDate.getTime() === defineds.endOfMonth.getTime(),
	},
	{
		label: "Next Month",
		range: function range() {
			return {
				startDate: defineds.startOfNextMonth,
				endDate: defineds.endOfNextMonth,
			};
		},
		isSelected: (range: IsSelectedRange) =>
			range.startDate.getTime() === defineds.startOfNextMonth.getTime() &&
			range.endDate.getTime() === defineds.endOfNextMonth.getTime(),
	},
];

const Header: React.FC<HeaderProps> = ({ placeholder }) => {
	const [searchInput, setSearchInput] = useState("");
	const [numberOfGuests, setNumberOfGuests] = useState(1);
	const [startDate, setStartDate] = useState(new Date());
	const [endDate, setEndDate] = useState(new Date());
	const router = useRouter();

	const selectionRange = {
		startDate: startDate,
		endDate: endDate,
		key: "selection",
	};

	const handleSelect = (ranges: {
		selection: { startDate: Date; endDate: Date };
	}) => {
		setStartDate(ranges.selection.startDate);
		setEndDate(ranges.selection.endDate);
	};

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
		<header className="md:px10 sticky top-0 z-50 grid grid-cols-3 bg-white p-5 shadow-md ">
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
					<DateRangePicker
						ranges={[selectionRange]}
						minDate={new Date()}
						rangeColors={["#FD5B61"]}
						onChange={handleSelect}
						staticRanges={createStaticRanges(customStaticRanges)}
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
