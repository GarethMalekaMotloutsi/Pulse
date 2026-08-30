# Pulse 🌍

Pulse is a live world snapshot dashboard that brings real-world data into one simple interface.

The project uses public APIs to collect information about earthquakes and weather, stores the data in Supabase, and displays it through a React dashboard.

I built Pulse as a practical project to bring together what I have been learning about APIs, databases, React, and working with real data.

## What Pulse Does

Pulse currently focuses on two types of live data:

- 🌎 Earthquake activity from the USGS Earthquake API
- 🌤️ Weather data from the Open-Meteo API

The data is fetched through scripts and stored in Supabase before being displayed in the application.

## Features

- Live earthquake data
- Weather data
- Supabase database integration
- Earthquake magnitude filtering
- Earthquake location and coordinates
- Event timestamps
- Automatic data updates using UPSERT
- Responsive dashboard interface

## How It Works

The application follows this simple flow:

```text
Public APIs
   ↓
Fetch Scripts
   ↓
Supabase Database
   ↓
React Application
   ↓
Pulse Dashboard
```

The fetch scripts retrieve data from the APIs, format the information into the fields needed by the application, and save it to Supabase.

UPSERT is used when saving the data so that existing records can be updated instead of creating duplicates.

## Database Design

I designed the database tables to store only the information needed by the Pulse dashboard instead of saving the full API response.

The earthquake table stores the earthquake ID, magnitude, location, latitude, longitude and time of the event. This gives the application the information it needs to display and filter earthquake activity.

The weather table stores the weather information required by the dashboard.

The earthquake ID is also used with UPSERT so that the same earthquake is not stored multiple times.

## Technologies Used

- React
- JavaScript
- Vite
- Supabase
- PostgreSQL
- USGS Earthquake API
- Open-Meteo API
- Node.js
- Git & GitHub

## Running the Project

Clone the repository:

```bash
git clone https://github.com/GarethMalekaMotloutsi/Pulse.git
```

Move into the project:

```bash
cd Pulse
```

Install the dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The application will then be available through the local Vite development server.

## Fetching Data

Earthquake data can be fetched using:

```bash
npm run fetch-earthquakes
```

Weather data can be fetched using:

```bash
npm run fetch-weather
```

The scripts connect to the public APIs and save the formatted results into Supabase.

## Project Structure

```text
Pulse/
├── public/
├── scripts/
│   ├── fetchEarthquakes.js
│   └── fetchWeather.js
├── src/
│   ├── assets/
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   ├── main.jsx
│   └── supabase.js
├── .env
├── .gitignore
├── .oxlintrc.json
├── index.html
├── package.json
├── package-lock.json
├── README.md
└── vite.config.js
```

## What I Learned

Working on Pulse gave me practical experience working with external APIs and connecting that data to a database and frontend application.

One of the main things I worked with was transforming API responses into a database structure that makes sense for the application. I also used Supabase and UPSERT operations to handle repeated API data without creating duplicate records.

## Project Status

Pulse is currently a working project with earthquake and weather data connected to the dashboard.

More functionality can be added in the future, but the current version focuses on the core idea of collecting, storing and displaying live world data.