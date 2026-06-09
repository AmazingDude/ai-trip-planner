import { Button } from "@/components/ui/button";
import { Clock, MapPinned } from "lucide-react";
import { Link } from "react-router-dom";
import SmartImage from "./SmartImage";

function PlaceCardItem({ place }) {
	return (
		<Link
			to={
				"https://www.google.com/maps/search/?api=1&query=" +
				encodeURIComponent(place?.PlaceName || "")
			}
			target="_blank"
		>
			<section className="mt-2 flex gap-4 rounded-[24px] bg-white p-3 shadow-[var(--shadow-tailtrails)] transition duration-200 hover:-translate-y-0.5">
				<SmartImage
					src={place?.PlaceImageURL}
					alt={place?.PlaceName}
					title={place?.PlaceName}
					type="place"
					className="h-[130px] w-[130px] shrink-0 rounded-2xl object-cover"
				/>
				<div className="min-w-0">
					<h3 className="text-lg font-semibold text-[#17191c]">{place.PlaceName}</h3>
					<p className="line-clamp-3 text-sm text-[#777b86]">
						{place.PlaceDetails}
					</p>
					<h4 className="mt-2 inline-flex items-center gap-1 text-sm text-[#4c4c4c]">
						<Clock className="size-4 text-[#5d2a1a]" />
						{place.TravelTimeFromPreviousLocation}
					</h4>
					<Button size="sm" className="mt-3 rounded-full">
						<MapPinned className="text-white" />
					</Button>
				</div>
			</section>
		</Link>
	);
}

export default PlaceCardItem;
