import React from "react";
import { Link } from "react-router-dom";

function UserTripCardItem({ trip }) {
	return (
		<Link to={"/view-trip/" + trip?.id}>
			<div className="hover:scale-105 transition ease-in-out">
				<img
					src="./placeholder.jpg"
					alt="trip-img"
					className="object-cover rounded-xl h-[180px]"
				/>
				<div>
					<h2 className="font-bold text-lg">
						{trip?.userSelection?.location.features[0].properties.name}
					</h2>
					<h3 className="text-sm text-gray-500">
						{trip?.userSelection?.numOfDays}{" "}
						{trip?.userSelection?.numOfDays > 1 ? "Days" : "Day"} Trip with{" "}
						{trip?.userSelection?.budget} budget
					</h3>
				</div>
			</div>
		</Link>
	);
}

export default UserTripCardItem;
