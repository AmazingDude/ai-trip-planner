import { Button } from "@/components/ui/button";
import React from "react";
import { IoIosSend } from "react-icons/io";

function InfoSection({ trip }) {
	return (
		<section className="my-5 flex flex-col gap-2">
			<img
				src="/placeholder.jpg"
				alt="placeholder"
				className="h-[350px] w-full object-cover rounded-xl"
			/>
			<div className="flex justify-between items-center">
				<div className="my-5 flex flex-col gap-2">
					<h2 className="font-bold text-2xl">
						{trip?.userSelection?.location.features[0].properties.name}
					</h2>
					<div className="flex gap-2">
						<h3 className="p-1 px-3 bg-orange-100 rounded-full text-zinc-800 text-[0.8rem] md:text-md">
							🗓️{trip?.userSelection?.numOfDays > 1 ? "Days" : "Day"}
						</h3>
						<h3 className="p-1 px-3 bg-violet-100 rounded-full text-teal-800 text-[0.8rem] md:text-md">
							💸{trip?.userSelection?.budget} Budget
						</h3>
						<h3 className="p-1 px-3 bg-teal-100 rounded-full text-teal-800 text-[0.8rem] md:text-md">
							🥂Travelers: {trip?.userSelection?.traveler}
						</h3>
					</div>
				</div>
				<Button>
					<IoIosSend />
				</Button>
			</div>
		</section>
	);
}

export default InfoSection;
