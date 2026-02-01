import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router";
import CreateTrip from "./create-trip";
import Header from "./components/custom/Header";
// import { Toaster } from "sonner";
import { Toaster } from "./components/ui/sonner";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ViewTrip from "./view-trip/[tripID]";
import MyTrips from "./my-trips";
import RedirectHandler from "./components/RedirectHandler";
import Root from "./Root.jsx";

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
	{ basename: "/ai-trip-planner" }
);

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_AUTH_KEY}>
			<Header />
			<Toaster />
			<RouterProvider router={router} />
		</GoogleOAuthProvider>
	</StrictMode>
);
