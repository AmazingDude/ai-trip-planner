import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AI_PROMPT, BudgetOptions, TravelsList } from "@/constants/options";
import { geminiGen } from "@/service/AIModel";
import { SearchBox } from "@mapbox/search-js-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import { useNavigate } from "react-router-dom";

function CreateTrip() {
	const [place, setPlace] = useState();
	const [formData, setFormData] = useState(null);
	const [openDialog, setOpenDialog] = useState(false);
	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();

	const handleInputChange = (name, value) => {
		setFormData({
			...formData,
			[name]: value,
		});
	};

	useEffect(() => {
		// console.log(formData);
	}, [formData]);

	const login = useGoogleLogin({
		// onSuccess: (res) => console.log(res),
		onSuccess: (res) => getUserProfile(res),
		onError: (error) => console.log(error),
	});

	const onTripGenerate = async () => {
		const user = localStorage.getItem("user");
		if (!user) {
			setOpenDialog(true);
			return;
		}

		if (
			formData?.numOfDays > 5 ||
			formData?.numOfDays < 1 ||
			!formData?.location ||
			!formData?.budget ||
			!formData?.traveler
		) {
			toast("Please select valid options :)");
			return;
		}

		setLoading(true);

		const FINAL_PROMPT = AI_PROMPT.replace(
			"{location}",
			formData?.location?.features[0].properties.name
		)
			.replace("{totalDays}", formData?.numOfDays)
			.replace("{traveler}", formData?.traveler)
			.replace("{budget}", formData?.budget)
			.replace("{totalDays}", formData?.numOfDays);

		// console.log("🎯 Sending Prompt:", FINAL_PROMPT);

		const result = await geminiGen(FINAL_PROMPT);

		if (result) {
			// console.log("🌍 Generated Trip Plan:", result);
		}
		saveAITripData(result);
	};

	const getUserProfile = (tokenInfo) => {
		// console.log("Token Info received:", tokenInfo);
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
				// console.log(res);
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
			tripData: tripData,
			userEmail: user?.email,
			id: docID,
		});
		setLoading(false);
		navigate("/view-trip/" + docID);
	};

	const theme = {
		variables: {
			boxShadow: "none",
			border: "1px solid #ccc",
		},
	};

	return (
		<div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
			<h2 className="font-bold text-3xl">
				Tell us your travel preferences 🏕️🌴
			</h2>
			<p className="mt-3 text-gray-500 text-xl">
				Just provide some basic information, and our trip planner will generate
				a customized itinerary based on your preferences.
			</p>
			<section className="mt-20 flex flex-col gap-10">
				<div>
					<h3 className="text-xl my-3 font-medium">
						What is destination of choice?
					</h3>
					<SearchBox
						accessToken={import.meta.env.VITE_MAPBOX_API_KEY}
						// onRetrieve={(res) => console.log("Selected:", res)}
						onRetrieve={(selectedPlace) => {
							setPlace(selectedPlace);
							handleInputChange("location", selectedPlace);
							// console.log(selectedPlace);
							// setInputValue(selectedPlace.place_name);
						}}
						theme={theme}
					/>
				</div>
				<div>
					<h3 className="text-xl my-3 font-medium">
						How many days are you planning your trip?
					</h3>
					<Input
						placeholder={"Ex: 2 Days"}
						type="number"
						onChange={(e) => handleInputChange("numOfDays", e.target.value)}
					/>
				</div>
			</section>
			<section className="mt-10">
				<h3 className="text-xl my-3 font-medium">What is Your Budget?</h3>
				<div className="grid grid-cols-3 gap-5 mt-5">
					{BudgetOptions.map((item, index) => (
						<div
							key={index}
							className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg transition duration-150 ${
								formData?.budget == item.title
									? "border-[1.5px] shadow-md border-black"
									: ""
							}`}
							onClick={() => handleInputChange("budget", item.title)}
						>
							<h4 className="text-4xl">{item.icon}</h4>
							<h4 className="font-bold text-lg">{item.title}</h4>
							<p className="text-sm text-gray-500">{item.desc}</p>
						</div>
					))}
				</div>
			</section>
			<section className="mt-10">
				<h3 className="text-xl my-3 font-medium">
					Who do you plan on traveling with on your next adventure?
				</h3>
				<div className="grid grid-cols-3 gap-5 mt-5">
					{TravelsList.map((item, index) => (
						<div
							key={index}
							className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg transition duration-150 ${
								formData?.traveler == item.people
									? "border-[1.5px] shadow-md border-black"
									: ""
							}`}
							onClick={() => handleInputChange("traveler", item.people)}
						>
							<h4 className="text-4xl">{item.icon}</h4>
							<h4 className="font-bold text-lg">{item.title}</h4>
							<p className="text-sm text-gray-500">{item.desc}</p>
						</div>
					))}
				</div>
			</section>
			<div className="mt-10 flex justify-center mb-10">
				<Button
					disabled={loading}
					onClick={onTripGenerate}
					className="cursor-pointer"
				>
					{loading ? (
						<AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />
					) : (
						"Generate Trip"
					)}
				</Button>
			</div>
			<Dialog open={openDialog}>
				<DialogContent>
					<DialogHeader>
						<DialogDescription>
							<img src="/logo.svg" alt="logo" />
							<h5 className="font-bold text-lg mt-7 text-gray-800">
								Sign In With Google
							</h5>
							<p>Sign in securely to the App with Google authentication.</p>
							<Button
								onClick={login}
								className="w-full mt-5 cursor-pointer flex items-center gap-2 pr-30"
							>
								<FcGoogle />
								Sign In
							</Button>
						</DialogDescription>
					</DialogHeader>
				</DialogContent>
			</Dialog>
		</div>
	);
}

export default CreateTrip;
