import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

function Hero() {
	return (
		<div className="flex items-center mx-56 gap-9 flex-col">
			<h1 className="font-extrabold text-[3.2rem] text-center text-[#222831] mt-16">
				<span className="text-[#00ADB5]">
					Discover Your Next Adventure with AI:{" "}
				</span>
				Personalized Itineraries at Your Fingertips
			</h1>
			<p className="text-xl text-gray-500 text-center">
				Your personal trip planner and travel curator, creating custom
				itineraries tailored to your interests and budget.
			</p>
			<Link to={"/create-trip"}>
				<Button className="cursor-pointer">Get Started Now!</Button>
			</Link>
		</div>
	);
}

export default Hero;
