import { GoogleGenAI } from "@google/genai";

export const geminiGen = async (promptText) => {
	const ai = new GoogleGenAI({
		apiKey: import.meta.env.VITE_GOOGLE_GEMINI_API_KEY,
	});
	const tools = [
		{
			googleSearch: {},
		},
	];
	const config = {
		thinkingConfig: {
			thinkingBudget: -1,
		},
		tools,
	};
	const model = "gemini-2.5-pro";
	const contents = [
		{
			role: "user",
			parts: [
				{
					text: promptText,
				},
			],
		},
	];
	// 	const contents = [
	// 		{
	// 			role: "user",
	// 			parts: [
	// 				{
	// 					text: `You are an API. Respond with **only** valid JSON. Do not include any explanation or markdown code blocks.

	// Generate a travel plan for: Las Vegas, for 3 days, for a couple on a cheap budget.

	// Your response must be in this JSON structure:
	// {
	//   "hotelOptions": [
	//     {
	//       "HotelName": "...",
	//       "HotelAddress": "...",
	//       "PricePerNight": "...",
	//       "HotelImageURL": "...",
	//       "GeoCoordinates": {
	//         "latitude": 0.0,
	//         "longitude": 0.0
	//       },
	//       "Rating": 0.0,
	//       "Description": "..."
	//     }
	//   ],
	//   "itinerary": [
	//     {
	//       "day": "Day 1",
	//       "places": [
	//         {
	//           "PlaceName": "...",
	//           "PlaceDetails": "...",
	//           "PlaceImageURL": "...",
	//           "GeoCoordinates": {
	//             "latitude": 0.0,
	//             "longitude": 0.0
	//           },
	//           "TicketPricing": "...",
	//           "Rating": 0.0,
	//           "BestTimeToVisit": "...",
	//           "TravelTimeFromPreviousLocation": "..."
	//         }
	//       ]
	//     }
	//   ]
	// }
	// ❗Return only valid, parsable JSON. Do not wrap the output in triple backticks or any text.
	// `,
	// 				},
	// 			],
	// 		},
	// 		{
	// 			role: "model",
	// 			parts: [
	// 				{
	// 					text: `**Exploring Vegas Options**

	// I've started generating a JSON structure for a 3-day Las Vegas trip for a budget-conscious couple. My focus is on sourcing affordable hotels, ideally on or near the Strip to curb transportation expenses. I'm currently researching hotel options and their respective prices to ensure the plan fits the budget. The goal is to build a detailed, yet economical, itinerary.

	// **Commencing Data Acquisition**

	// I'm now in the process of gathering the necessary information for the JSON output. I've initiated search queries using the specified keywords to populate the hotel and attraction data. My primary focus remains on budget-friendly options. Next, I'll compile the collected data into the structured JSON format, ensuring all requested fields are populated.

	// **Refining JSON Structure**

	// I've successfully structured the JSON output with 'hotelOptions' and 'itinerary' keys.  I'm populating the hotel objects, ensuring they include all requested details like name, address, price, image placeholders, coordinates, rating, and description.  I'm now focusing on crafting a compelling and realistic 3-day itinerary, including varied attractions for each day.  The itinerary will provide detailed information to create a comprehensive yet affordable trip.

	// **Initiating JSON Construction**

	// I'm now in the process of structuring the JSON output, having successfully compiled the necessary data. I've initiated the creation of the main JSON object with "hotelOptions" and "itinerary" as keys. I'm focusing on ensuring each hotel object within "hotelOptions" and place object within the itinerary accurately reflects the collected information, including comprehensive details for a well-rounded and budget-conscious Las Vegas trip plan. The formatting will be strictly JSON.

	// `,
	// 				},
	// 				{
	// 					text: `\`\`\`json
	// {
	//   "hotelOptions": [
	//     {
	//       "HotelName": "Excalibur Hotel & Casino",
	//       "HotelAddress": "3850 S Las Vegas Blvd, Las Vegas, NV 89109",
	//       "PricePerNight": "$58",
	//       "HotelImageURL": "https://www.kayak.com/rimg/himg/a6/60/a1/rev-11388-10025752-327020.jpg?width=1200&height=900&crop=true",
	//       "GeoCoordinates": {
	//         "latitude": 36.0987,
	//         "longitude": -115.175
	//       },
	//       "Rating": 7.8,
	//       "Description": "A medieval castle-themed hotel and casino located on the Las Vegas Strip, offering affordable rooms and a variety of entertainment options. [39, 43, 45, 48, 51]"
	//     },
	//     {
	//       "HotelName": "Circus Circus Hotel, Casino & Theme Park",
	//       "HotelAddress": "2880 S Las Vegas Blvd, Las Vegas, NV 89109",
	//       "PricePerNight": "$69",
	//       "HotelImageURL": "https://www.kayak.com/rimg/himg/1e/8a/68/rev-10583-13488734-099452.jpg?width=1200&height=900&crop=true",
	//       "GeoCoordinates": {
	//         "latitude": 36.1374,
	//         "longitude": -115.165
	//       },
	//       "Rating": 6.8,
	//       "Description": "A hotel and casino with a circus theme, featuring live circus acts, an indoor amusement park called the Adventuredome, and budget-friendly rooms. [23, 40, 42, 44, 47, 49]"
	//     },
	//     {
	//       "HotelName": "The LINQ Hotel + Experience",
	//       "HotelAddress": "3535 S Las Vegas Blvd, Las Vegas, NV 89109",
	//       "PricePerNight": "$85",
	//       "HotelImageURL": "https://www.caesars.com/content/dam/lin/hotel/room/deluxe-room-2-queens-no-view-non-smoking-1.jpg.transform/card-image/image.jpg",
	//       "GeoCoordinates": {
	//         "latitude": 36.1176,
	//         "longitude": -115.1709
	//       },
	//       "Rating": 7.6,
	//       "Description": "A modern hotel and casino at the heart of the Strip, known for the High Roller observation wheel and the LINQ Promenade with its shops, restaurants, and entertainment. [12, 13]"
	//     }
	//   ],
	//   "itinerary": [
	//     {
	//       "day": "Day 1",
	//       "places": [
	//         {
	//           "PlaceName": "Welcome to Fabulous Las Vegas Sign",
	//           "PlaceDetails": "An iconic Las Vegas landmark since 1959, this 25-foot-tall sign is a must-see for a classic photo opportunity. [11, 14, 36] It's located on the south end of the Strip. [14, 36]",
	//           "PlaceImageURL": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Welcome_to_Fabulous_Las_Vegas_sign.jpg/1200px-Welcome_to_Fabulous_Las_Vegas_sign.jpg",
	//           "GeoCoordinates": {
	//             "latitude": 36.082,
	//             "longitude": -115.1727
	//           },
	//           "TicketPricing": "Free. [11, 15, 34]",
	//           "Rating": 4.5,
	//           "BestTimeToVisit": "Early morning to avoid long lines and the heat. [15]",
	//           "TravelTimeFromPreviousLocation": "N/A"
	//         },
	//         {
	//           "PlaceName": "Bellagio Conservatory & Botanical Gardens",
	//           "PlaceDetails": "Located inside the Bellagio hotel, this 14,000-square-foot conservatory features stunning, elaborate floral displays that change with the seasons and holidays. [3, 4, 6, 19] A team of over 100 horticulturalists creates these breathtaking arrangements. [8]",
	//           "PlaceImageURL": "https://newsroom.bellagio.com/content/dam/bellagio/press-room/pr-photos/2022/spring-display/Bellagio_Conservatory_Spring_2022_Daytime_Overall_005.jpg",
	//           "GeoCoordinates": {
	//             "latitude": 36.1132,
	//             "longitude": -115.1767
	//           },
	//           "TicketPricing": "Free admission. [3, 4, 7, 18, 19]",
	//           "Rating": 4.8,
	//           "BestTimeToVisit": "Weekday mornings or early afternoons to avoid crowds. [7]",
	//           "TravelTimeFromPreviousLocation": "Approximately a 10-15 minute drive or a 30-40 minute walk."
	//         },
	//         {
	//           "PlaceName": "Fountains of Bellagio",
	//           "PlaceDetails": "A spectacular show of water, music, and light on the more than 8-acre lake in front of the Bellagio. The fountains shoot water up to 460 feet in the air. [9]",
	//           "PlaceImageURL": "https://bellagio.mgmresorts.com/content/dam/MGM/bellagio/entertainment/fountains-of-bellagio/bellagio-entertainment-fountains-exterior-dusk.jpg",
	//           "GeoCoordinates": {
	//             "latitude": 36.1127,
	//             "longitude": -115.1746
	//           },
	//           "TicketPricing": "Free. [5, 8]",
	//           "Rating": 4.8,
	//           "BestTimeToVisit": "Evening shows for the best experience with the lights. [7]",
	//           "TravelTimeFromPreviousLocation": "Located just outside the Bellagio Conservatory."
	//         }
	//       ]
	//     },
	//     {
	//       "day": "Day 2",
	//       "places": [
	//         {
	//           "PlaceName": "Seven Magic Mountains",
	//           "PlaceDetails": "A public art installation in the desert featuring seven towers of colorful, stacked boulders standing over 30 feet high. [2, 28, 33] It's a popular spot for photos. [21]",
	//           "PlaceImageURL": "https://www.maxtour.co/wp-content/uploads/2019/12/Seven-Magic-Mountains-Las-Vegas.jpeg",
	//           "GeoCoordinates": {
	//             "latitude": 35.839,
	//             "longitude": -115.275
	//           },
	//           "TicketPricing": "Free. [2, 21, 22, 28]",
	//           "Rating": 4.5,
	//           "BestTimeToVisit": "Sunrise or sunset for the best lighting and to avoid crowds. [33]",
	//           "TravelTimeFromPreviousLocation": "Approximately a 30-minute drive from the Las Vegas Strip."
	//         },
	//         {
	//           "PlaceName": "The LINQ Promenade",
	//           "PlaceDetails": "An open-air shopping, dining, and entertainment district located in the heart of the Strip. [13, 38] It features the High Roller observation wheel and various shops and restaurants. [13, 24, 38]",
	//           "PlaceImageURL": "https://www.caesars.com/content/dam/lin/things-to-do/promenade/1920x1080/linq-promenade-1920x1080.jpg.transform/card-image/image.jpg",
	//           "GeoCoordinates": {
	//             "latitude": 36.1176,
	//             "longitude": -115.1709
	//           },
	//           "TicketPricing": "Free to walk through; prices for attractions like the High Roller and Fly LINQ Zipline vary. [13]",
	//           "Rating": 4.6,
	//           "BestTimeToVisit": "Evening, when the promenade is lit up and lively.",
	//           "TravelTimeFromPreviousLocation": "Approximately a 30-minute drive back to the Strip."
	//         }
	//       ]
	//     },
	//     {
	//       "day": "Day 3",
	//       "places": [
	//         {
	//           "PlaceName": "Fremont Street Experience",
	//           "PlaceDetails": "A five-block pedestrian mall in downtown Las Vegas featuring a massive LED canopy (Viva Vision), free live music on three stages, and various street performers. [6, 10, 17, 27]",
	//           "PlaceImageURL": "https://vegasexperience.com/wp-content/uploads/2023/07/V3-Canopy-Image-1-scaled.jpg",
	//           "GeoCoordinates": {
	//             "latitude": 36.1704,
	//             "longitude": -115.145
	//           },
	//           "TicketPricing": "Free admission. [10, 17, 35]",
	//           "Rating": 4.6,
	//           "BestTimeToVisit": "Evening, when the Viva Vision light shows run every hour. [10, 27]",
	//           "TravelTimeFromPreviousLocation": "N/A"
	//         },
	//         {
	//           "PlaceName": "Red Rock Canyon National Conservation Area",
	//           "PlaceDetails": "A national conservation area with a 13-mile scenic drive, hiking trails, and unique geological formations. [16, 31] It's a great way to experience the Mojave Desert. [31]",
	//           "PlaceImageURL": "https://www.redrockcanyonlv.org/wp-content/uploads/2019/07/RR-Canyon-from-scenic-drive-1.jpg",
	//           "GeoCoordinates": {
	//             "latitude": 36.14,
	//             "longitude": -115.4277
	//           },
	//           "TicketPricing": "$20 per vehicle for a day pass. [16, 25, 31]",
	//           "Rating": 4.9,
	//           "BestTimeToVisit": "Mornings, especially during warmer months, to avoid the heat. Timed entry reservations are required from October 1 to May 31. [31, 32]",
	//           "TravelTimeFromPreviousLocation": "Approximately a 25-30 minute drive from Fremont Street."
	//         }
	//       ]
	//     }
	//   ]
	// }\`\`\``,
	// 				},
	// 			],
	// 		},
	// 		{
	// 			role: "user",
	// 			parts: [
	// 				{
	// 					text: `INSERT_INPUT_HERE`,
	// 				},
	// 			],
	// 		},
	// 	];

	const response = ai.models.generateContent({
		model,
		config,
		contents,
	});
	let fullResponse = "";
	for await (const chunk of response) {
		fullResponse += chunk.text;
	}

	// Strip triple backticks and code block if needed
	fullResponse = fullResponse
		.trim()
		.replace(/^```json/, "")
		.replace(/```$/, "");

	try {
		const parsedJSON = JSON.parse(fullResponse);
		console.log("✅ Parsed Itinerary:", parsedJSON);
		return parsedJSON; // <- So you can use it in your UI
	} catch (err) {
		console.error("❌ Error parsing JSON:", err);
		toast("Something went wrong. Please try again.");
	}
};
