import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import { useNavigation } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";

function Header() {
	const user = JSON.parse(localStorage.getItem("user"));
	const [openDialog, setOpenDialog] = useState(false);
	const login = useGoogleLogin({
		// onSuccess: (res) => console.log(res),
		onSuccess: (res) => getUserProfile(res),
		onError: (error) => console.log(error),
	});

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
				window.location.reload();
			})
			.catch((err) => {
				console.log(err);
			});
	};

	// useEffect(() => {
	// 	// console.log(user);
	// }, []);

	return (
		<nav className="p-3 border flex justify-between items-center px-5">
			<a href="/ai-trip-planner">
				<div className="flex items-center cursor-pointer">
					<img src="./logo.svg" alt="" />
					<h1 className="font-bold text-2xl ml-2 font-google-sans text-gray-800">
						TailTrails
					</h1>
				</div>
			</a>
			<div>
				{user ? (
					<div className="flex items-center gap-3">
						<a href="/ai-trip-planner/create-trip">
							<Button
								variant="outline"
								className="rounded-full hover:shadow-md cursor-pointer"
							>
								Create Trip
							</Button>
						</a>
						<a href="/ai-trip-planner/my-trips">
							<Button
								variant="outline"
								className="rounded-full hover:shadow-md cursor-pointer"
							>
								My Trips
							</Button>
						</a>
						<Popover>
							<PopoverTrigger>
								<img
									src={user?.picture}
									alt="profile-pic"
									className="h-[35px] w-[35px] rounded-full cursor-pointer"
								/>
							</PopoverTrigger>
							<PopoverContent>
								<h2
									className="cursor-pointer"
									onClick={() => {
										googleLogout();
										localStorage.clear();
										window.location.reload();
									}}
								>
									Log out
								</h2>
							</PopoverContent>
						</Popover>
					</div>
				) : (
					<Button
						className="cursor-pointer"
						onClick={() => setOpenDialog(true)}
					>
						Sign In
					</Button>
				)}
			</div>
			<Dialog open={openDialog}>
				<DialogContent>
					<DialogHeader>
						<DialogDescription>
							<div className="flex items-center">
								<img src="./logo.svg" alt="logo" />
								<h1 className="font-bold text-2xl ml-3 font-google-sans text-gray-800">
									TailTrails
								</h1>
							</div>
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
		</nav>
	);
}

export default Header;
