import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function RedirectHandler() {
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		const params = new URLSearchParams(location.search);
		const redirect = params.get("redirect");
		if (redirect) {
			navigate(redirect, { replace: true });
		}
	}, [location.search, navigate]);

	return null;
}
