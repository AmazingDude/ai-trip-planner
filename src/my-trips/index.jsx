import { db } from "@/service/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserTripCardItem from "./components/UserTripCardItem";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

function MyTrips() {
	const navigate = useNavigate();
	const [userTrips, setUserTrips] = useState([]);
	const [loading, setLoading] = useState(true);

	const getUserTrips = useCallback(async () => {
		const user = JSON.parse(localStorage.getItem("user"));
		if (!user) {
			navigate("/");
			return;
		}

		setLoading(true);
		setUserTrips([]);
		const q = query(
			collection(db, "cities"),
			where("userEmail", "==", user?.email)
		);
		const querySnapshot = await getDocs(q);
		setUserTrips(querySnapshot.docs.map((docSnap) => docSnap.data()));
		setLoading(false);
	}, [navigate]);

	useEffect(() => {
		getUserTrips();
	}, [getUserTrips]);

	return (
		<div className="bg-[#f7f7f8] px-5 py-12 sm:px-10">
		<div className="mx-auto max-w-6xl">
			<div className="flex flex-wrap items-center justify-between gap-4">
				<div>
					<h2 className="font-display text-4xl text-[#17191c]">My Trips</h2>
					<p className="mt-2 text-[#777b86]">
						Review your saved AI-generated itineraries.
					</p>
				</div>
				<Link to="/create-trip">
					<Button className="rounded-full">
						<Plus />
						New Trip
					</Button>
				</Link>
			</div>

			<div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
				{loading
					? [1, 2, 3, 4, 5, 6].map((item) => (
							<div
								key={item}
								className="h-[240px] w-full animate-pulse rounded-[24px] bg-white shadow-[var(--shadow-tailtrails)]"
							></div>
						))
					: userTrips.map((trip) => (
							<UserTripCardItem key={trip.id} trip={trip} />
						))}
			</div>

			{!loading && userTrips.length === 0 && (
				<div className="mt-10 rounded-[24px] border border-dashed border-[#d8d9de] bg-white p-10 text-center shadow-[var(--shadow-tailtrails)]">
					<h3 className="text-lg font-semibold text-[#17191c]">
						No trips yet
					</h3>
					<p className="mt-2 text-[#777b86]">
						Create your first itinerary to see it here.
					</p>
				</div>
			)}
		</div>
		</div>
	);
}

export default MyTrips;
