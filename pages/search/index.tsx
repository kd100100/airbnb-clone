import { format } from "date-fns";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { Footer } from "../../components/Footer";
import Header from "../../components/Header";
import InfoCard from "../../components/InfoCard";
import Map from "../../components/Mapbox.jsx";

interface SearchProps {
	searchResults: {
		img: string;
		location: string;
		title: string;
		description: string;
		star: number;
		price: string;
		total: string;
		long: number;
		lat: number;
	}[];
}

const Search: NextPage<SearchProps> = ({ searchResults }) => {
	const router = useRouter();

	const { location, startDate, endDate, numberOfGuests } = router.query;

	const formattedStartDate = format(
		new Date(startDate as string),
		"dd MMMM yyyy"
	);
	const formattedEndDate = format(
		new Date(endDate as string),
		"dd MMMM yyyy"
	);
	const range = `${formattedStartDate} - ${formattedEndDate}`;

	return (
		<div>
			<Head>
				<title>London</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Header
				placeholder={`${location} | ${range} | ${numberOfGuests} guests`}
			/>

			<main className="flex">
				<section className="flex-grow px-6 pt-14">
					<p className="text-xs">
						300+ Stays - {range} - for {numberOfGuests} guests
					</p>
					<h1 className="mt-2 mb-6 text-3xl font-semibold">
						Stays in {location}
					</h1>
					<div className="mb-5 hidden flex-row space-x-3 whitespace-nowrap text-gray-800 lg:flex">
						<button className="filter-button">
							Cancellation Flexibility
						</button>
						<button className="filter-button">Type of Place</button>
						<button className="filter-button">Price</button>
						<button className="filter-button">
							Rooms and Beds
						</button>
						<button className="filter-button">More Filters</button>
					</div>

					<div className="flex flex-col">
						{searchResults?.map((result, index) => (
							<InfoCard {...result} key={index} />
						))}
					</div>
				</section>

				<aside className="relative hidden min-w-[600px] overflow-hidden xl:inline-flex">
					<Map searchResults={searchResults} />
				</aside>
			</main>

			<Footer />
		</div>
	);
};

export default Search;

export const getServerSideProps = async () => {
	const searchResults = await fetch("https://links.papareact.com/isz").then(
		(res) => res.json()
	);

	return {
		props: {
			searchResults,
		},
	};
};
