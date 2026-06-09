import { CalendarDays, WalletCards } from "lucide-react";
import { Link } from "react-router-dom";

function UserTripCardItem({ trip }) {
	const placeholderImage = `${import.meta.env.BASE_URL}placeholder.jpg`;
	const locationName =
		trip?.userSelection?.location?.features?.[0]?.properties?.name ||
		"Saved trip";
	const numOfDays = Number(trip?.userSelection?.numOfDays);

	return (
		<Link to={"/view-trip/" + trip?.id}>
			<article className="overflow-hidden rounded-[24px] bg-white shadow-[var(--shadow-tailtrails)] transition duration-200 hover:-translate-y-1">
				<img
					src={placeholderImage}
					alt=""
					className="h-[170px] w-full object-cover"
				/>
				<div className="p-4">
					<h2 className="line-clamp-1 text-lg font-semibold text-[#17191c]">
						{locationName}
					</h2>
					<div className="mt-3 flex flex-wrap gap-2 text-sm text-[#777b86]">
						<span className="inline-flex items-center gap-1 rounded-full bg-[#fbe1d1] px-3 py-1 text-[#5d2a1a]">
							<CalendarDays className="size-4" />
							{numOfDays} {numOfDays > 1 ? "Days" : "Day"}
						</span>
						<span className="inline-flex items-center gap-1 rounded-full bg-[#d3e3fc] px-3 py-1 text-[#17191c]">
							<WalletCards className="size-4" />
							{trip?.userSelection?.budget}
						</span>
					</div>
				</div>
			</article>
		</Link>
	);
}

export default UserTripCardItem;
