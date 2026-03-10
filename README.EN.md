# SKYVISION — Weather App

## Overview

**SKYVISION** is a modern, visually engaging weather application built with **HTML, CSS, and JavaScript**. It provides real-time weather information for any city worldwide using the **OpenWeatherMap API**. The app features dynamic background animations based on the current weather, day/night toggle, and smooth interactive effects.

Key highlights:

- Day/Night mode toggle 🌞🌙
- Weather-dependent animated backgrounds (sun, clouds, rain, snow, thunderstorm, mist)
- Responsive design for mobile and desktop
- Real-time weather details: temperature, humidity, wind, pressure, and “feels like” temperature
- Test animation panel for previewing all weather states

## Features

- **City Search:** Enter any city to fetch its current weather.
- **Dynamic Backgrounds:** Background gradients and animations adapt to weather conditions.
- **Animated Weather Effects:** Sun, clouds, rain, snow, lightning, and mist appear based on real data.
- **Night Mode:** Automatic star field and icon variations for night mode.
- **Responsive Design:** Works seamlessly on desktop and mobile.
- **Test Mode:** Quickly cycle through different weather animations.

## Live Demo

You can run the project locally or deploy on **GitHub Pages** to see the live version.

## Installation / Running Locally

1. Clone the repository:

```bash
git clone https://github.com/your-username/skyvision.git
cd skyvision

2. Open index.html in your browser.
3.⚠️ Important: Before fetching weather data, add your OpenWeatherMap API key in script.js:

const API_KEY = 'YOUR_API_KEY_HERE';
Replace 'YOUR_API_KEY_HERE' with your personal key.

skyvision/
├─ index.html
├─ style.css
├─ script.js
├─ icons/           # Weather icons (default, sun-day/night, clouds, rain, etc.)
└─ README.md

## Technologies Used
HTML5 — Structure of the app
CSS3 — Animations, responsive layouts, gradients
JavaScript — Fetch API, DOM manipulation, dynamic weather effects
OpenWeatherMap API — Real-time weather data

## Weather Animations
Weather Type	Visual Effect
Clear	Sun with floating clouds
Clouds	Moving clouds
Rain	Falling raindrops
Snow	Falling snowflakes
Thunderstorm	Rain + clouds + occasional lightning
Drizzle	Light clouds + light rain
Mist/Fog/Haze	Semi-transparent mist layers

## Day/Night Toggle
Users can switch between day and night manually.
Night mode displays stars and changes weather icons to night variants.

## Contribution
Fork the repository
Create your branch (git checkout -b feature-name)
Make changes and commit (git commit -m "Add feature")
Push to the branch (git push origin feature-name)
Open a Pull Request