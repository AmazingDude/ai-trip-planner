import { db } from "@/service/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import InfoSection from "../components/InfoSection";
import Hotels from "../components/Hotels";
import PlacesToVisit from "../components/PlacesToVisit";
import Footer from "../components/Footer";

function ViewTrip() {
	const { tripID } = useParams();
	const [trip, setTrip] = useState([]);

	useEffect(() => {
		getTripData();
	}, []);

	const getTripData = async () => {
		const docRef = doc(db, "cities", tripID);
		const docSnap = await getDoc(docRef);

		if (docSnap) {
			// console.log("DocSnap exists", docSnap);
			setTrip(docSnap.data());
			// console.log("DATA", docSnap.data());
		} else {
			// console.log("No such Document!");
			toast("No such document found");
		}
	};
	return (
		<>
			<div className="p-10 md:px-20 lg:px-44 xl:px-56 select-none">
				{/* Info Section */}
				<InfoSection trip={trip} />
				{/* Recommendations */}
				<Hotels trip={trip} />
				{/* Iternaries */}
				<PlacesToVisit trip={trip} />
				{/* Footer */}
			</div>
			<Footer />
		</>
	);
}

export default ViewTrip;
