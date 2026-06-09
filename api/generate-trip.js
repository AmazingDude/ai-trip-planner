const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
const FREE_MODELS = [
	"openrouter/free",
	"meta-llama/llama-3.3-70b-instruct:free",
	"meta-llama/llama-3.2-3b-instruct:free",
];

const setCorsHeaders = (req, res) => {
	const allowedOrigin = process.env.ALLOWED_ORIGIN || "*";
	res.setHeader("Access-Control-Allow-Origin", allowedOrigin);
	res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
	res.setHeader("Access-Control-Allow-Headers", "Content-Type");
	res.setHeader("Vary", "Origin");
};

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

const isRetryableProviderError = (status) =>
	status === 408 || status === 429 || status >= 500;

const callProvider = async (model, prompt, apiKey, origin) => {
	const response = await fetch(OPENROUTER_URL, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${apiKey}`,
			"Content-Type": "application/json",
			"HTTP-Referer": origin || "https://amazingdude.github.io",
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
					content: prompt,
				},
			],
			temperature: 0.4,
		}),
	});

	const payload = await response.json().catch(() => null);

	if (!response.ok) {
		const error = new Error(
			payload?.error?.message ||
				`AI provider failed with status ${response.status}.`
		);
		error.status = response.status;
		error.model = model;
		throw error;
	}

	const content = payload?.choices?.[0]?.message?.content;

	if (!content) {
		throw new Error(`AI provider returned no content for ${model}.`);
	}

	return extractJsonObject(content);
};

export default async function handler(req, res) {
	setCorsHeaders(req, res);

	if (req.method === "OPTIONS") {
		return res.status(204).end();
	}

	if (req.method !== "POST") {
		return res.status(405).json({ error: "Method not allowed." });
	}

	const apiKey = process.env.OPENROUTER_API_KEY;

	if (!apiKey) {
		return res.status(500).json({ error: "AI provider is not configured." });
	}

	const prompt = req.body?.prompt;

	if (!prompt || typeof prompt !== "string") {
		return res.status(400).json({ error: "Missing prompt." });
	}

	let lastError;

	for (const model of FREE_MODELS) {
		try {
			const tripPlan = await callProvider(
				model,
				prompt,
				apiKey,
				req.headers.origin
			);
			return res.status(200).json(tripPlan);
		} catch (error) {
			lastError = error;

			if (!isRetryableProviderError(error.status)) {
				break;
			}
		}
	}

	console.error("Trip generation failed:", lastError);
	return res.status(lastError?.status === 429 ? 429 : 502).json({
		error:
			lastError?.status === 429
				? "Free AI limits are busy. Please try again later."
				: "The AI service could not generate a trip plan.",
	});
}
