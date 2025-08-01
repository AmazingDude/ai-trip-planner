import React from "react";
import { Link } from "react-router-dom";

function Hotels({ trip }) {
	return (
		<section>
			<h2 className="font-bold text-xl mt-5">Hotel Recommendation</h2>
			<div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
				{trip?.tripData?.hotelOptions?.map((hotel, index) => (
					<Link
						to={
							"https://www.google.com/maps/search/?api=1&query=" +
							hotel?.HotelName +
							"," +
							hotel?.HotelAddress
						}
						target="_blank"
					>
						<div className="hover:shadow-md transition duration-200 ease-in-out rounded-xl p-2 cursor-pointer">
							<img
								src="/placeholder.jpg"
								alt="placeholder"
								className="rounded-xl"
							/>
							<div className="my-2 flex flex-col gap-2">
								<h3 className="font-medium">{hotel?.HotelName}</h3>
								<p className="text-xs text-zinc-500">📍{hotel?.HotelAddress}</p>
								<h4 className="text-sm">💰{hotel?.PricePerNight}</h4>
								<h4 className="text-sm">⭐{hotel?.Rating} stars</h4>
							</div>
						</div>
					</Link>
				))}
			</div>
		</section>
	);
}

export default Hotels;
