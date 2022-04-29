import Image from "next/image";
import React from "react";

interface MediumCardProps {
	img: string;
	title: string;
}

export const MediumCard: React.FC<MediumCardProps> = ({ img, title }) => {
	return (
		<div className="transform cursor-pointer transition duration-300 ease-out hover:scale-105">
			<div className="relative h-80 w-80">
				<Image
					src={img}
					alt="medium card"
					layout="fill"
					className="rounded-xl"
				/>
			</div>
			<h3 className="text-2xl font-semibold">{title}</h3>
		</div>
	);
};
