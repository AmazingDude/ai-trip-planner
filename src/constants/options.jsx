export const TravelsList = [
	{
		id: 1,
		title: "Just me",
		desc: "A solo traveler ready to explore",
		icon: "plane",
		people: "1",
	},
	{
		id: 2,
		title: "A Couple",
		desc: "Two travelers planning together",
		icon: "heart",
		people: "2 People",
	},
	{
		id: 3,
		title: "Family",
		desc: "A family-friendly trip plan",
		icon: "home",
		people: "3 to 5 People",
	},
	{
		id: 4,
		title: "Friends",
		desc: "A shared adventure with friends",
		icon: "sailboat",
		people: "5 to 10 People",
	},
];

export const BudgetOptions = [
	{
		id: 1,
		title: "Cheap",
		desc: "Stay conscious of costs",
		icon: "badgeDollar",
	},
	{
		id: 2,
		title: "Moderate",
		desc: "Keep cost on the average side",
		icon: "wallet",
	},
	{
		id: 3,
		title: "Luxury",
		desc: "Do not worry about cost",
		icon: "gem",
	},
];

// export const AI_PROMPT =
// 	"Generate Travel Plan for Location : {location},for {totalDays} Days for {traveler} with a {budget} budget, give me Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, Time travel each of the location for {totalDays} days with each day plan with best time to visit in JSON format.";

export const AI_PROMPT = `
You are an API. You must only respond with valid JSON, without explanations or markdown.

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

Do NOT include markdown, explanations, comments, code blocks, or extra text. Only return the JSON object above. Be sure to include at least 3 hotel options in the hotelOptions array. Leave HotelImageURL and PlaceImageURL as empty strings unless you are certain the image URL is direct, stable, and publicly hotlinkable.
`;
