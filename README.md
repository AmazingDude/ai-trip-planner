# TailTrails

TailTrails is an AI trip planner that generates personalized itineraries from a destination, trip length, budget, and traveler group. It uses OpenRouter for itinerary generation, Mapbox Search for destination lookup, Firebase for saved trips, and a polished React/Vite interface.

## Screenshots

### Home

![TailTrails home screen](docs/screenshots/home.png)

### Trip Preferences

![TailTrails trip preferences screen](docs/screenshots/create-trip.png)

## Features

- AI-generated hotel recommendations and day-by-day places to visit
- Destination search with Mapbox
- Google sign-in and saved trips with Firebase
- OpenRouter free-model routing for itinerary generation
- Graceful visual fallbacks when AI-provided image URLs are missing or broken
- Responsive, editorial-style UI with lucide-react icons

## Tech Stack

- React 19
- Vite 7
- Tailwind CSS 4
- Firebase / Firestore
- Mapbox Search
- OpenRouter API
- lucide-react

## Environment Variables

Create a `.env.local` file using `.env.local.example` as a starting point:

```env
VITE_OPENROUTER_API_KEY=your_openrouter_api_key_here
VITE_MAPBOX_API_KEY=your_mapbox_api_key_here
VITE_GOOGLE_CLIENT_AUTH_KEY=your_google_oauth_client_id_here
VITE_GOOGLE_API_KEY=your_firebase_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_firebase_measurement_id
```

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Run lint checks:

```bash
npm run lint
```
