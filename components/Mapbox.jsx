import * as React from "react";
import Map, { Marker, Popup } from "react-map-gl";
import * as geolib from "geolib";
import "mapbox-gl/dist/mapbox-gl.css";

function Mapbox({ searchResults }) {
	const coordinates = searchResults.map((item) => ({
		latitude: item.lat,
		longitude: item.long,
	}));

	const center = geolib.getCenter(coordinates);

	return (
		<Map
			initialViewState={{
				...center,
				zoom: 12,
			}}
			style={{ width: "100%", height: "100%" }}
			mapStyle="mapbox://styles/kd100100/cl2qye4cu000214s848pblcql"
			mapboxAccessToken={process.env.MAPBOX_TOKEN}
		>
			{searchResults?.map((result, index) => (
				<div key={index} className="relative">
					<Marker
						latitude={result.lat}
						longitude={result.long}
						offset={[0, 0]}
					>
						<p className=" cursor-pointer text-2xl transition hover:animate-bounce">
							📍
						</p>
					</Marker>
				</div>
			))}
		</Map>
	);
}

export default Mapbox;
