# LiveWeatherApp

A small React weather app that searches for a city and displays the current weather conditions, including temperature, humidity, wind speed, date, and a matching weather illustration.

## Features

- Search for a city by name
- Show current temperature
- Display humidity and wind speed
- Show the weather description and a dynamic weather image
- Handle invalid city names with a friendly error message
- Show a loading state while the request is in progress
- Built with React and Vite

## Tech Stack

- React
- Vite
- Open-Meteo API for geocoding and weather data
- CSS for layout and styling

## Project Structure

```bash
src/
  App.jsx
  components/
    SearchBar.jsx
    WeatherApp.jsx
    WeatherCard.jsx
    WeatherDetails.jsx
    NotFound.jsx
  constants/
    weatherTheme.js
  services/
    weatherApi.js
  utils/
    weatherCode.js
  index.css
  main.jsx
```

## How it works

The app uses the Open-Meteo APIs:

1. It searches for the city using the geocoding API.
2. It gets the latitude and longitude of the selected city.
3. It fetches the current weather data for those coordinates.
4. It maps the WMO weather code to a human-readable description and visual theme.

## Getting started

### Install dependencies

```bash
npm install
```

### Run the app locally

```bash
npm run dev
```

Then open the local URL shown in the terminal, usually:

```bash
http://localhost:5173/
```

## Build for production

```bash
npm run build
```

## Notes

This project is a simple front-end weather dashboard designed to practice React state management, API integration, conditional rendering, and responsive UI design.
