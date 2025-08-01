export const TravelsList = [
	{
		id: 1,
		title: "Just me",
		desc: "A sole travels in exploration",
		icon: "✈️",
		people: "1",
	},
	{
		id: 2,
		title: "A Couple",
		desc: "Two travels in tandem",
		icon: "🥂",
		people: "2 People",
	},
	{
		id: 3,
		title: "Family",
		desc: "A sole travels in exploration",
		icon: "🏡",
		people: "3 to 5 People",
	},
	{
		id: 4,
		title: "Friends",
		desc: "A bunch of thril seekers",
		icon: "⛵",
		people: "5 to 10 People",
	},
];

export const BudgetOptions = [
	{
		id: 1,
		title: "Cheap",
		desc: "Stay Concious of costs",
		icon: "💵",
	},
	{
		id: 2,
		title: "Moderate",
		desc: "Keep cost on the average side",
		icon: "💰",
	},
	{
		id: 3,
		title: "Luxury",
		desc: "Dont worry about cost",
		icon: "💸",
	},
];

// export const AI_PROMPT =
// 	"Generate Travel Plan for Location : {location},for {totalDays} Days for {traveler} with a {budget} budget, give me Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, Time travel each of the location for {totalDays} days with each day plan with best time to visit in JSON format.";

export const AI_PROMPT = `
You are an API. You must ONLY respond with **valid JSON**, without explanations or markdown.

Generate a travel plan for:
- Location: {location}
- Duration: {totalDays} days
- Traveler type: {traveler}
- Budget: {budget}

Return your response in this exact JSON format:

{
  "hotelOptions": [
    {
      "HotelName": "",
      "HotelAddress": "",
      "PricePerNight": "",
      "HotelImageURL": "",
      "GeoCoordinates": {
        "latitude": 0.0,
        "longitude": 0.0
      },
      "Rating": 0.0,
      "Description": ""
    }
    // Include at least 3 hotel options
  ],
  "itinerary": [
    {
      "day": "Day 1",
      "places": [
        {
          "PlaceName": "",
          "PlaceDetails": "",
          "PlaceImageURL": "",
          "GeoCoordinates": {
            "latitude": 0.0,
            "longitude": 0.0
          },
          "TicketPricing": "",
          "Rating": 0.0,
          "BestTimeToVisit": "",
          "TravelTimeFromPreviousLocation": ""
        }
      ]
    }
  ]
}

⚠️ Do NOT include markdown, explanations, code blocks, or extra text — only return the JSON object above. Be sure to include at least **3 hotel options** in the hotelOptions array.
`;
