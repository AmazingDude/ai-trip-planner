import React from "react";
import PlaceCardItem from "./PlaceCardItem";

function PlacesToVisit({ trip }) {
	return (
		<section>
			<h2 className="font-bold text-lg">Places to Visit</h2>
			<div>
				{trip.tripData?.itinerary.map((item, index) => (
					<div className="mt-5">
						<h2 className="font-medium text-lg">{item.day}</h2>
						<div className="grid md:grid-cols-2 gap-5">
							{item.places.map((place, index) => (
								<div>
									<h4 className="font-medium text-sm text-orange-300">
										{place.BestTimeToVisit}
									</h4>
									<PlaceCardItem place={place} />
								</div>
							))}
						</div>
					</div>
				))}
			</div>
		</section>
	);
}

export default PlacesToVisit;
