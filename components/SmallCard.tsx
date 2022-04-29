import Image from "next/image";
import React from "react";

interface SmallCardProps {
	img: string;
	location: string;
	distance: string;
}

export const SmallCard: React.FC<SmallCardProps> = ({
	img,
	location,
	distance,
}) => {
	return (
		<div className="m-2 mt-5 flex transform cursor-pointer items-center space-x-4 rounded-xl transition duration-200 ease-out hover:scale-105 hover:bg-gray-100">
			<div className="relative h-16 w-16">
				<Image
					src={img}
					alt="small card"
					layout="fill"
					className="rounded-lg"
				/>
			</div>
			<div>
				<h2>{location}</h2>
				<p>{distance}</p>
			</div>
		</div>
	);
};
