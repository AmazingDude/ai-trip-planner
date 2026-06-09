// Root.jsx
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Header from "./components/custom/Header";

export default function Root() {
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		const params = new URLSearchParams(location.search);
		const redirect = params.get("redirect");
		if (redirect) {
			navigate(redirect, { replace: true });
		}
	}, [location.search, navigate]);

	return (
		<>
			<Header />
			<Outlet />
		</>
	);
}
