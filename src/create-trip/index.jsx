import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AI_PROMPT, BudgetOptions, TravelsList } from "@/constants/options";
import { generateTripPlan } from "@/service/AIModel";
import { db } from "@/service/firebaseConfig";
import { SearchBox } from "@mapbox/search-js-react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import {
	BadgeDollarSign,
	Gem,
	Heart,
	Home,
	LoaderCircle,
	Plane,
	Route,
	Sailboat,
	Users,
	Wallet,
} from "lucide-react";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
} from "@/components/ui/dialog";

const optionIcons = {
	badgeDollar: BadgeDollarSign,
	gem: Gem,
	heart: Heart,
	home: Home,
	plane: Plane,
	sailboat: Sailboat,
	wallet: Wallet,
};

const optionThemes = {
	badgeDollar: {
		bg: "bg-emerald-50",
		border: "border-emerald-500",
		icon: "text-emerald-600",
		ring: "bg-emerald-50",
	},
	gem: {
		bg: "bg-sky-50",
		border: "border-sky-500",
		icon: "text-sky-600",
		ring: "bg-sky-50",
	},
	heart: {
		bg: "bg-rose-50",
		border: "border-rose-500",
		icon: "text-rose-500",
		ring: "bg-rose-50",
	},
	home: {
		bg: "bg-amber-50",
		border: "border-amber-500",
		icon: "text-amber-600",
		ring: "bg-amber-50",
	},
	plane: {
		bg: "bg-blue-50",
		border: "border-blue-500",
		icon: "text-blue-600",
		ring: "bg-blue-50",
	},
	route: {
		bg: "bg-indigo-50",
		border: "border-indigo-500",
		icon: "text-indigo-600",
		ring: "bg-indigo-50",
	},
	sailboat: {
		bg: "bg-cyan-50",
		border: "border-cyan-500",
		icon: "text-cyan-600",
		ring: "bg-cyan-50",
	},
	wallet: {
		bg: "bg-violet-50",
		border: "border-violet-500",
		icon: "text-violet-600",
		ring: "bg-violet-50",
	},
};

function CreateTripGoogleButton({ onSuccess, className }) {
	const login = useGoogleLogin({
		onSuccess,
		onError: (error) => console.log(error),
	});

	return (
		<Button onClick={login} className={className}>
			<FcGoogle />
			Sign In
		</Button>
	);
}

function CreateTrip() {
	const [formData, setFormData] = useState({});
	const [openDialog, setOpenDialog] = useState(false);
	const [loading, setLoading] = useState(false);
	const logoSrc = `${import.meta.env.BASE_URL}logo.svg`;
	const aiProxyUrl = import.meta.env.VITE_AI_PROXY_URL;
	const mapboxPublicToken = import.meta.env.VITE_MAPBOX_PUBLIC_TOKEN;
	const aiDisabled = !aiProxyUrl;
	const googleAuthEnabled = Boolean(import.meta.env.VITE_GOOGLE_CLIENT_AUTH_KEY);

	const navigate = useNavigate();

	const handleInputChange = (name, value) => {
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const onTripGenerate = async () => {
		if (aiDisabled) {
			toast("AI features are disabled in this demo build.");
			return;
		}

		const user = localStorage.getItem("user");
		if (!user) {
			setOpenDialog(true);
			return;
		}

		const totalDays = Number(formData?.numOfDays);
		const locationName =
			formData?.location?.features?.[0]?.properties?.name ||
			formData?.location?.features?.[0]?.properties?.full_address;

		if (
			totalDays > 5 ||
			totalDays < 1 ||
			!locationName ||
			!formData?.budget ||
			!formData?.traveler
		) {
			toast("Please choose a destination, 1-5 days, budget, and travelers.");
			return;
		}

		setLoading(true);

		try {
			const finalPrompt = AI_PROMPT.replace("{location}", locationName)
				.replaceAll("{totalDays}", totalDays)
				.replace("{traveler}", formData.traveler)
				.replace("{budget}", formData.budget);

			const result = await generateTripPlan(finalPrompt, aiProxyUrl);

			if (!result) {
				setLoading(false);
				return;
			}

			await saveAITripData(result);
		} catch (error) {
			console.error(error);
			toast("Could not generate your trip. Please try again.");
			setLoading(false);
		}
	};

	const getUserProfile = (tokenInfo) => {
		axios
			.get(
				`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
				{
					headers: {
						Authorization: `Bearer ${tokenInfo?.access_token}`,
						Accept: "Application/json",
					},
				}
			)
			.then((res) => {
				localStorage.setItem("user", JSON.stringify(res.data));
				setOpenDialog(false);
				onTripGenerate();
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const saveAITripData = async (tripData) => {
		const user = JSON.parse(localStorage.getItem("user"));
		const docID = Date.now().toString();
		await setDoc(doc(db, "cities", docID), {
			userSelection: formData,
			tripData,
			userEmail: user?.email,
			id: docID,
		});
		setLoading(false);
		navigate("/view-trip/" + docID);
	};

	const theme = {
		variables: {
			boxShadow: "none",
			border: "1px solid #d1d5db",
			borderRadius: "0.5rem",
		},
	};

	return (
		<div className="bg-[#f7f7f8] px-5 py-10 sm:px-10">
			<div className="mx-auto max-w-5xl rounded-[32px] bg-white p-6 shadow-[var(--shadow-tailtrails)] sm:p-10">
			<div className="flex items-start gap-3">
				<div className="rounded-2xl bg-[#fbe1d1] p-3 text-[#5d2a1a]">
					<Route className="size-6" />
				</div>
				<div>
					<h2 className="font-display text-4xl leading-tight text-[#17191c]">
						Tell us your travel preferences
					</h2>
					<p className="mt-3 max-w-3xl text-lg leading-8 text-[#4c4c4c]">
						Just provide some basic information, and our trip planner will
						generate a customized itinerary based on your preferences.
					</p>
					{aiDisabled && (
						<p className="mt-4 rounded-2xl bg-[#fbe1d1] px-4 py-3 text-sm font-medium text-[#5d2a1a]">
							AI features are disabled in this demo build.
						</p>
					)}
				</div>
			</div>

			<section className="mt-14 flex flex-col gap-10">
				<div>
					<h3 className="my-3 text-lg font-medium text-[#17191c]">
						What is your destination of choice?
					</h3>
					{mapboxPublicToken ? (
						<SearchBox
							accessToken={mapboxPublicToken}
							onRetrieve={(selectedPlace) => {
								handleInputChange("location", selectedPlace);
							}}
							theme={theme}
						/>
					) : (
						<Input
							placeholder="Ex: Islamabad"
							onChange={(e) =>
								handleInputChange("location", {
									features: [{ properties: { name: e.target.value } }],
								})
							}
						/>
					)}
				</div>
				<div>
					<h3 className="my-3 text-lg font-medium text-[#17191c]">
						How many days are you planning your trip?
					</h3>
					<Input
						min="1"
						max="5"
						placeholder="Ex: 2 days"
						type="number"
						onChange={(e) => handleInputChange("numOfDays", e.target.value)}
					/>
				</div>
			</section>

			<section className="mt-10">
				<h3 className="my-3 text-lg font-medium text-[#17191c]">What is your budget?</h3>
				<div className="mt-5 grid gap-4 sm:grid-cols-3">
					{BudgetOptions.map((item) => {
						const Icon = optionIcons[item.icon];
						const theme = optionThemes[item.icon];
						const selected = formData?.budget === item.title;

						return (
							<div
								key={item.id}
								className={`cursor-pointer rounded-[24px] border p-5 transition duration-150 hover:-translate-y-0.5 hover:shadow-[var(--shadow-tailtrails)] ${
									selected
										? `${theme.border} ${theme.bg} shadow-md`
										: "border-[#d8d9de] bg-white"
								}`}
								onClick={() => handleInputChange("budget", item.title)}
							>
								<div
									className={`mb-4 inline-flex rounded-2xl p-3 ${theme.ring} ${theme.icon}`}
								>
									<Icon className="size-6" />
								</div>
								<h4 className="text-lg font-semibold text-[#17191c]">{item.title}</h4>
								<p className="text-sm text-[#777b86]">{item.desc}</p>
							</div>
						);
					})}
				</div>
			</section>

			<section className="mt-10">
				<h3 className="my-3 text-lg font-medium text-[#17191c]">
					Who do you plan on traveling with?
				</h3>
				<div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
					{TravelsList.map((item) => {
						const Icon = optionIcons[item.icon] || Users;
						const theme = optionThemes[item.icon] || optionThemes.route;
						const selected = formData?.traveler === item.people;

						return (
							<div
								key={item.id}
								className={`cursor-pointer rounded-[24px] border p-5 transition duration-150 hover:-translate-y-0.5 hover:shadow-[var(--shadow-tailtrails)] ${
									selected
										? `${theme.border} ${theme.bg} shadow-md`
										: "border-[#d8d9de] bg-white"
								}`}
								onClick={() => handleInputChange("traveler", item.people)}
							>
								<div
									className={`mb-4 inline-flex rounded-2xl p-3 ${theme.ring} ${theme.icon}`}
								>
									<Icon className="size-6" />
								</div>
								<h4 className="text-lg font-semibold text-[#17191c]">{item.title}</h4>
								<p className="text-sm text-[#777b86]">{item.desc}</p>
							</div>
						);
					})}
				</div>
			</section>

			<div className="mb-10 mt-10 flex justify-center">
				<Button
					disabled={loading || aiDisabled}
					onClick={onTripGenerate}
					className="rounded-full"
				>
					{loading ? (
						<LoaderCircle className="size-5 animate-spin" />
					) : (
						"Generate Trip"
					)}
				</Button>
			</div>

			<Dialog open={openDialog} onOpenChange={setOpenDialog}>
				<DialogContent>
					<DialogHeader>
						<DialogDescription>
							<img src={logoSrc} alt="TailTrails logo" className="h-12 w-12" />
							<h5 className="mt-7 text-lg font-bold text-gray-800">
								Sign In With Google
							</h5>
							<p>Sign in securely to the app with Google authentication.</p>
							{googleAuthEnabled ? (
								<CreateTripGoogleButton
									onSuccess={(res) => getUserProfile(res)}
									className="mt-5 flex w-full items-center gap-2"
								/>
							) : (
								<Button
									onClick={() =>
										toast("Google sign-in is disabled in this demo build.")
									}
									className="mt-5 flex w-full items-center gap-2"
								>
									<FcGoogle />
									Sign In Disabled
								</Button>
							)}
						</DialogDescription>
					</DialogHeader>
				</DialogContent>
			</Dialog>
			</div>
		</div>
	);
}

export default CreateTrip;
