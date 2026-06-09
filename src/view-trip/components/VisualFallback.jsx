import { Building2, Camera, Landmark, MapPinned, Mountain, Palmtree } from "lucide-react";

const themes = {
	hotel: {
		frame: "from-[#d3e3fc] via-white to-[#f7f7f8]",
		iconBg: "bg-white/75",
		icon: "text-[#17191c]",
		Icon: Building2,
		label: "Stay",
	},
	place: {
		frame: "from-[#fbe1d1] via-white to-[#d3e3fc]",
		iconBg: "bg-white/75",
		icon: "text-[#5d2a1a]",
		Icon: Landmark,
		label: "Visit",
	},
	hero: {
		frame: "from-[#d3e3fc] via-white to-[#fbe1d1]",
		iconBg: "bg-white/75",
		icon: "text-[#17191c]",
		Icon: Mountain,
		label: "Trip",
	},
};

function VisualFallback({ title, type = "place", className = "" }) {
	const theme = themes[type] || themes.place;
	const Icon = theme.Icon;

	return (
		<div
			className={`relative isolate flex overflow-hidden bg-gradient-to-br ${theme.frame} ${className}`}
			aria-label={title || theme.label}
			role="img"
		>
			<div className="absolute -left-8 bottom-0 h-24 w-24 rounded-full bg-white/40" />
			<div className="absolute right-3 top-3 h-16 w-16 rounded-full bg-white/35" />
			<div className="absolute bottom-3 right-4 flex gap-2 text-white/60">
				<Palmtree className="size-7" />
				<MapPinned className="size-7" />
				<Camera className="size-7" />
			</div>
			<div className="relative z-10 m-auto flex flex-col items-center gap-2 px-4 text-center">
				<div className={`rounded-full ${theme.iconBg} p-3 shadow-sm backdrop-blur`}>
					<Icon className={`size-7 ${theme.icon}`} />
				</div>
				<span className="line-clamp-2 text-sm font-semibold text-[#17191c]">
					{title || theme.label}
				</span>
			</div>
		</div>
	);
}

export default VisualFallback;
