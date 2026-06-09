import { toast } from "sonner";

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
const FREE_MODELS = [
	"openrouter/free",
	"meta-llama/llama-3.3-70b-instruct:free",
	"meta-llama/llama-3.2-3b-instruct:free",
];

const extractJsonObject = (text) => {
	const trimmed = text
		.trim()
		.replace(/^```(?:json)?/i, "")
		.replace(/```$/i, "")
		.trim();

	try {
		return JSON.parse(trimmed);
	} catch {
		const start = trimmed.indexOf("{");
		const end = trimmed.lastIndexOf("}");

		if (start === -1 || end === -1 || end <= start) {
			throw new Error("The model did not return a JSON object.");
		}

		return JSON.parse(trimmed.slice(start, end + 1));
	}
};

const isRetryableOpenRouterError = (status) =>
	status === 408 || status === 429 || status >= 500;

const callOpenRouter = async (model, promptText, apiKey) => {
	const response = await fetch(OPENROUTER_URL, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${apiKey}`,
			"Content-Type": "application/json",
			"HTTP-Referer": window.location.origin,
			"X-OpenRouter-Title": "TailTrails AI Trip Planner",
		},
		body: JSON.stringify({
			model,
			messages: [
				{
					role: "system",
					content:
						"You generate travel itineraries. Return only valid JSON. No markdown, no comments, no prose.",
				},
				{
					role: "user",
					content: promptText,
				},
			],
			temperature: 0.4,
		}),
	});

	const payload = await response.json().catch(() => null);

	if (!response.ok) {
		const message =
			payload?.error?.message ||
			`OpenRouter request failed with status ${response.status}.`;
		const error = new Error(message);
		error.status = response.status;
		error.model = model;
		throw error;
	}

	const content = payload?.choices?.[0]?.message?.content;

	if (!content) {
		throw new Error(`OpenRouter returned no content for ${model}.`);
	}

	return extractJsonObject(content);
};

export const generateTripPlan = async (promptText) => {
	const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;

	if (!apiKey) {
		toast("Missing OpenRouter API key. Add VITE_OPENROUTER_API_KEY first.");
		return null;
	}

	let lastError;

	for (const model of FREE_MODELS) {
		try {
			return await callOpenRouter(model, promptText, apiKey);
		} catch (error) {
			lastError = error;
			console.warn(`OpenRouter model failed: ${model}`, error);

			if (!isRetryableOpenRouterError(error.status)) {
				break;
			}
		}
	}

	console.error("Trip generation failed:", lastError);
	toast(
		lastError?.status === 429
			? "Free OpenRouter limits are busy. Please try again in a minute."
			: "The free AI model could not return a usable trip plan. Please try again."
	);
	return null;
};
