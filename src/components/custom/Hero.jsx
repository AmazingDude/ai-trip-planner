import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, BarChart3, MapPinned, Sparkles, WalletCards } from "lucide-react";

function Hero() {
	return (
		<main className="tail-glow relative isolate overflow-hidden px-5 py-16 text-center md:py-24 xl:min-h-[680px]">
			<div className="pointer-events-none absolute left-[max(1rem,calc(50%-43rem))] top-[28rem] z-0 hidden w-48 p-5 text-left iso-grain-card iso-left xl:block">
				<div className="relative z-10 mb-4 inline-flex rounded-full bg-[#fbe1d1] p-2 text-[#5d2a1a]">
					<WalletCards className="size-4" />
				</div>
				<p className="relative z-10 text-sm font-medium text-[#777b86]">Budget balance</p>
				<p className="relative z-10 mt-1 text-2xl font-semibold text-[#17191c]">$860</p>
			</div>
			<div className="pointer-events-none absolute right-[max(1rem,calc(50%-43rem))] top-[28rem] z-0 hidden w-52 p-5 text-left iso-grain-card iso-right xl:block">
				<div className="relative z-10 mb-4 flex h-16 items-end gap-2 rounded-2xl bg-[#d3e3fc]/80 px-4 pb-3">
					<div className="h-7 w-4 rounded-full bg-[#5d2a1a]" />
					<div className="h-10 w-4 rounded-full bg-[#17191c]" />
					<div className="h-5 w-4 rounded-full bg-[#777b86]" />
					<div className="h-12 w-4 rounded-full bg-[#17191c]" />
				</div>
				<p className="relative z-10 text-sm font-medium text-[#777b86]">Daily fit</p>
			</div>

			<div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center gap-8">
				<div className="inline-flex items-center gap-2 rounded-full border border-[#fbe1d1] bg-white px-4 py-2 text-sm font-medium text-[#5d2a1a] shadow-sm">
					<Sparkles className="size-4 text-[#5d2a1a]" />
					Plan smarter in minutes
				</div>
				<h1 className="font-display max-w-4xl text-5xl leading-[1.08] text-[#17191c] sm:text-6xl lg:text-7xl">
					Discover your next adventure with AI.
				</h1>
				<p className="max-w-2xl text-lg leading-8 text-[#4c4c4c] sm:text-xl">
					A calm travel workspace for generating custom itineraries shaped by
					your budget, pace, and people.
				</p>
				<div className="flex flex-wrap items-center justify-center gap-4">
					<Link to={"/create-trip"}>
						<Button size="lg" className="rounded-full bg-[#17191c] px-6 hover:bg-black">
							Get Started Now
							<ArrowRight className="text-white" />
						</Button>
					</Link>
					<Link
						to="/my-trips"
						className="inline-flex items-center gap-2 text-sm font-medium text-[#17191c]"
					>
						<MapPinned className="size-4 text-[#5d2a1a]" />
						View saved trips
					</Link>
				</div>
			</div>
			<div className="pointer-events-none mx-auto mt-14 hidden max-w-md items-center gap-3 rounded-full bg-white p-3 text-left shadow-[var(--shadow-tailtrails)] md:flex">
				<div className="rounded-full bg-[#d3e3fc] p-3 text-[#17191c]">
					<BarChart3 className="size-5" />
				</div>
				<div>
					<p className="text-sm font-medium text-[#17191c]">
						Three-day itinerary preview
					</p>
					<p className="text-sm text-[#777b86]">
						Hotels, travel times, best windows, and budget notes.
					</p>
				</div>
			</div>
		</main>
	);
}

export default Hero;
