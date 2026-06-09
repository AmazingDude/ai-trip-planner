import { MapPin, Star, WalletCards } from "lucide-react";
import { Link } from "react-router-dom";
import SmartImage from "./SmartImage";

function Hotels({ trip }) {
	const hotels = trip?.tripData?.hotelOptions || [];

	return (
		<section className="mt-8">
			<h2 className="font-display text-3xl text-[#17191c]">Hotel Recommendations</h2>
			<div className="mt-5 grid gap-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
				{hotels.map((hotel) => (
					<Link
						key={`${hotel?.HotelName}-${hotel?.HotelAddress}`}
						to={
							"https://www.google.com/maps/search/?api=1&query=" +
							encodeURIComponent(`${hotel?.HotelName}, ${hotel?.HotelAddress}`)
						}
						target="_blank"
					>
						<article className="h-full overflow-hidden rounded-[24px] bg-white shadow-[var(--shadow-tailtrails)] transition duration-200 hover:-translate-y-1">
							<SmartImage
								src={hotel?.HotelImageURL}
								alt={hotel?.HotelName}
								title={hotel?.HotelName}
								type="hotel"
								className="h-36 w-full object-cover"
							/>
							<div className="flex flex-col gap-2 p-4">
								<h3 className="font-medium text-[#17191c]">{hotel?.HotelName}</h3>
								<p className="inline-flex items-start gap-1 text-xs text-[#777b86]">
									<MapPin className="mt-0.5 size-3.5 shrink-0 text-[#5d2a1a]" />
									{hotel?.HotelAddress}
								</p>
								<h4 className="inline-flex items-center gap-1 text-sm">
									<WalletCards className="size-4 text-[#5d2a1a]" />
									{hotel?.PricePerNight}
								</h4>
								<h4 className="inline-flex items-center gap-1 text-sm">
									<Star className="size-4 fill-[#fbe1d1] text-[#5d2a1a]" />
									{hotel?.Rating} stars
								</h4>
							</div>
						</article>
					</Link>
				))}
			</div>
		</section>
	);
}

export default Hotels;
