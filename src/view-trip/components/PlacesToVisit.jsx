import PlaceCardItem from "./PlaceCardItem";

function PlacesToVisit({ trip }) {
	const itinerary = trip?.tripData?.itinerary || [];

	return (
		<section className="mt-10">
			<h2 className="font-display text-3xl text-[#17191c]">Places to Visit</h2>
			<div>
				{itinerary.map((item) => (
					<div key={item.day} className="mt-5">
						<h3 className="text-lg font-medium text-[#17191c]">{item.day}</h3>
						<div className="grid gap-5 md:grid-cols-2">
							{item.places.map((place) => (
								<div key={`${item.day}-${place.PlaceName}`}>
									<h4 className="text-sm font-medium text-[#5d2a1a]">
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
