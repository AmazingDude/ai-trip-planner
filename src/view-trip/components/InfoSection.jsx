import { Button } from "@/components/ui/button";
import { CalendarDays, Send, Users, WalletCards } from "lucide-react";
import SmartImage from "./SmartImage";

function InfoSection({ trip }) {
	const locationName =
		trip?.userSelection?.location?.features?.[0]?.properties?.name ||
		"Trip details";
	const numOfDays = Number(trip?.userSelection?.numOfDays);

	return (
		<section className="my-5 flex flex-col gap-2">
			<SmartImage
				title={locationName}
				type="hero"
				className="h-[350px] w-full rounded-[24px] object-cover shadow-[var(--shadow-tailtrails)]"
			/>
			<div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
				<div className="my-5 flex flex-col gap-2">
					<h2 className="font-display text-4xl text-[#17191c]">
						{locationName}
					</h2>
					<div className="flex flex-wrap gap-2">
						<span className="inline-flex items-center gap-1 rounded-full bg-[#fbe1d1] px-3 py-1 text-sm text-[#5d2a1a]">
							<CalendarDays className="size-4" />
							{numOfDays} {numOfDays > 1 ? "Days" : "Day"}
						</span>
						<span className="inline-flex items-center gap-1 rounded-full bg-[#d3e3fc] px-3 py-1 text-sm text-[#17191c]">
							<WalletCards className="size-4" />
							{trip?.userSelection?.budget} Budget
						</span>
						<span className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-sm text-[#777b86] shadow-sm">
							<Users className="size-4 text-[#5d2a1a]" />
							Travelers: {trip?.userSelection?.traveler}
						</span>
					</div>
				</div>
				<Button size="icon" className="rounded-full">
					<Send className="text-white" />
				</Button>
			</div>
		</section>
	);
}

export default InfoSection;
