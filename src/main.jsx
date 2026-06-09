import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router";
import CreateTrip from "./create-trip";
import { Toaster } from "./components/ui/sonner";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ViewTrip from "./view-trip/[tripID]";
import MyTrips from "./my-trips";
import Root from "./Root.jsx";

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_AUTH_KEY;
const routerBaseName =
	import.meta.env.BASE_URL === "/"
		? "/"
		: import.meta.env.BASE_URL.replace(/\/$/, "");

const router = createBrowserRouter(
	[
		{
			path: "/",
			element: <Root />, // Root handles redirect and renders children
			children: [
				{ path: "/", element: <App /> },
				{ path: "create-trip", element: <CreateTrip /> },
				{ path: "view-trip/:tripID", element: <ViewTrip /> },
				{ path: "my-trips", element: <MyTrips /> },
			],
		},
	],
	{ basename: routerBaseName }
);

const appContent = (
	<>
		<Toaster />
		<RouterProvider router={router} />
	</>
);

createRoot(document.getElementById("root")).render(
	<StrictMode>
		{googleClientId ? (
			<GoogleOAuthProvider clientId={googleClientId}>
				{appContent}
			</GoogleOAuthProvider>
		) : (
			appContent
		)}
	</StrictMode>
);
