import { db } from "@/service/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import InfoSection from "../components/InfoSection";
import Hotels from "../components/Hotels";
import PlacesToVisit from "../components/PlacesToVisit";
import Footer from "../components/Footer";

function ViewTrip() {
	const { tripID } = useParams();
	const [trip, setTrip] = useState(null);
	const [loading, setLoading] = useState(true);

	const getTripData = useCallback(async () => {
		setLoading(true);
		const docRef = doc(db, "cities", tripID);
		const docSnap = await getDoc(docRef);

		if (docSnap.exists()) {
			setTrip(docSnap.data());
		} else {
			toast("No such document found");
		}
		setLoading(false);
	}, [tripID]);

	useEffect(() => {
		getTripData();
	}, [getTripData]);

	if (loading) {
		return (
			<div className="bg-[#f7f7f8] px-5 py-10 sm:px-10">
			<div className="mx-auto max-w-6xl">
				<div className="h-[350px] animate-pulse rounded-[24px] bg-white shadow-[var(--shadow-tailtrails)]" />
				<div className="mt-8 grid gap-5 md:grid-cols-3">
					{[1, 2, 3].map((item) => (
						<div
							key={item}
							className="h-[220px] animate-pulse rounded-[24px] bg-white shadow-[var(--shadow-tailtrails)]"
						/>
					))}
				</div>
			</div>
			</div>
		);
	}

	return (
		<>
			<div className="bg-[#f7f7f8] px-5 py-10 sm:px-10">
			<div className="mx-auto max-w-6xl select-none">
				<InfoSection trip={trip} />
				<Hotels trip={trip} />
				<PlacesToVisit trip={trip} />
			</div>
			</div>
			<Footer />
		</>
	);
}

export default ViewTrip;
