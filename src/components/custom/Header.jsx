import { useState } from "react";
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
} from "@/components/ui/dialog";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { LogOut, Map, Plus, Route } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

function HeaderGoogleButton({ onSuccess, className }) {
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

function Header() {
	const user = JSON.parse(localStorage.getItem("user"));
	const [openDialog, setOpenDialog] = useState(false);
	const logoSrc = `${import.meta.env.BASE_URL}logo.svg`;
	const googleAuthEnabled = Boolean(import.meta.env.VITE_GOOGLE_CLIENT_AUTH_KEY);

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
				// console.log(res);
				localStorage.setItem("user", JSON.stringify(res.data));
				setOpenDialog(false);
				window.location.reload();
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<nav className="sticky top-0 z-40 flex min-h-16 items-center justify-between border-b border-[#e6e6ea] bg-white/90 px-4 py-3 backdrop-blur md:px-8">
			<Link to="/" className="flex items-center gap-2">
				<img src={logoSrc} alt="TailTrails logo" className="h-10 w-10" />
				<div>
					<h1 className="font-display text-2xl text-[#17191c]">
						TailTrails
					</h1>
					<p className="hidden text-xs text-[#777b86] sm:block">
						AI trip planner
					</p>
				</div>
			</Link>
			<div>
				{user ? (
					<div className="flex items-center gap-3">
						<Link to="/create-trip">
							<Button
								variant="outline"
								className="hidden rounded-full border-[#d8d9de] bg-white hover:bg-[#f7f7f8] sm:inline-flex"
							>
								<Plus className="text-[#5d2a1a]" />
								Create Trip
							</Button>
						</Link>
						<Link to="/my-trips">
							<Button
								variant="outline"
								className="rounded-full border-[#d8d9de] bg-white hover:bg-[#f7f7f8]"
							>
								<Map className="text-[#17191c]" />
								My Trips
							</Button>
						</Link>
						<Popover>
							<PopoverTrigger asChild>
								<img
									src={user?.picture}
									alt={user?.name ? `${user.name} profile` : "Profile"}
									className="h-10 w-10 cursor-pointer rounded-full border object-cover"
								/>
							</PopoverTrigger>
							<PopoverContent align="end" className="w-52">
								<div className="mb-3 border-b pb-3">
									<p className="truncate text-sm font-medium text-gray-900">
										{user?.name}
									</p>
									<p className="truncate text-xs text-gray-500">{user?.email}</p>
								</div>
								<Button
									variant="ghost"
									className="w-full justify-start"
									onClick={() => {
										googleLogout();
										localStorage.clear();
										window.location.reload();
									}}
								>
									<LogOut className="text-rose-500" />
									Log out
								</Button>
							</PopoverContent>
						</Popover>
					</div>
				) : (
					<Button
						onClick={() => setOpenDialog(true)}
						className="rounded-full bg-[#17191c] px-5 hover:bg-black"
					>
						<Route className="text-white" />
						Sign In
					</Button>
				)}
			</div>
			<Dialog open={openDialog} onOpenChange={setOpenDialog}>
				<DialogContent>
					<DialogHeader>
						<DialogDescription>
							<div className="flex items-center">
								<img src={logoSrc} alt="TailTrails logo" className="h-11 w-11" />
								<h1 className="font-bold text-2xl ml-3 font-google-sans text-gray-800">
									TailTrails
								</h1>
							</div>
							<h5 className="font-bold text-lg mt-7 text-gray-800">
								Sign In With Google
							</h5>
							<p>Sign in securely to the App with Google authentication.</p>
							{googleAuthEnabled ? (
								<HeaderGoogleButton
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
		</nav>
	);
}

export default Header;
