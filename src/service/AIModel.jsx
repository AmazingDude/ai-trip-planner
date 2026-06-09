import { toast } from "sonner";

export const generateTripPlan = async (promptText, proxyUrl) => {
	if (!proxyUrl) {
		toast("AI features are disabled in this demo build.");
		return null;
	}

	try {
		const response = await fetch(proxyUrl, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ prompt: promptText }),
		});

		const payload = await response.json().catch(() => null);

		if (!response.ok) {
			throw new Error(
				payload?.error || `AI proxy failed with status ${response.status}.`
			);
		}

		return payload;
	} catch (error) {
		console.error("Trip generation failed:", error);
		toast("The AI service could not return a usable trip plan. Please try again.");
		return null;
	}
};
