import type { NextPage } from "next";
import Head from "next/head";
import Hero from "../components/Hero";
import Header from "../components/Header";
import { SmallCard } from "../components/SmallCard";
import { MediumCard } from "../components/MediumCard";
import { LargeCard } from "../components/LargeCard";
import { Footer } from "../components/Footer";

interface HomeProps {
	exploreData: Array<{
		img: string;
		location: string;
		distance: string;
	}>;
	cardsData: Array<{
		img: string;
		title: string;
	}>;
}

const Home: NextPage<HomeProps> = ({ exploreData, cardsData }) => {
	return (
		<div className="">
			<Head>
				<title>Airbnb</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Header />
			<Hero />

			<main className="mx-auto max-w-7xl px-8 sm:px-16 ">
				<section className="pt-6 ">
					<h2 className="pb-5 text-4xl font-semibold">
						Explore Nearby
					</h2>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
						{exploreData?.map((item, index) => (
							<SmallCard key={index} {...item} />
						))}
					</div>
				</section>

				<section className="pt-6 ">
					<h2 className="pb-5 text-4xl font-semibold">
						Live Anywhere
					</h2>
					<div className="-ml-3 flex space-x-3 overflow-scroll p-3 scrollbar-hide">
						{cardsData?.map((item, index) => (
							<MediumCard key={index} {...item} />
						))}
					</div>
				</section>

				<LargeCard
					img="http://links.papareact.com/4cj"
					title="The Greatest Outdoors"
					description="Wishlists curated by Airbnb"
					buttonText="Get Inspired"
				/>
			</main>

			<footer>
				<Footer />
			</footer>
		</div>
	);
};

export default Home;

export async function getStaticProps() {
	const exploreData = await fetch("https://links.papareact.com/pyp").then(
		(res) => res.json()
	);

	const cardsData = await fetch("https://links.papareact.com/zp1").then(
		(res) => res.json()
	);

	return {
		props: {
			exploreData,
			cardsData,
		},
	};
}
