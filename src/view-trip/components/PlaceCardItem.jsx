import { Button } from "@/components/ui/button";
import React from "react";
import { FaMapLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";

function PlaceCardItem({ place }) {
	return (
		<Link
			to={"https://www.google.com/maps/search/?api=1&query=" + place?.PlaceName}
			target="_blank"
		>
			<section className="border rounded-xl p-3 mt-2 flex gap-5 hover:shadow-sm transition duration-200 ease-in-out cursor-pointer">
				<img
					src="/placeholder.jpg"
					alt="placeholder"
					className="w-[130px] h-[130px] rounded-xl"
				/>
				<div>
					<h3 className="font-bold text-lg ">{place.PlaceName}</h3>
					<p className="text-sm text-gray-400">{place.PlaceDetails}</p>
					<h3 className="mt-2">🕑{place.TravelTimeFromPreviousLocation}</h3>
					<Button size="sm">
						<FaMapLocationDot />
					</Button>
				</div>
			</section>
		</Link>
	);
}

export default PlaceCardItem;
