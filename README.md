Weather Dashboard
A modern, responsive weather dashboard built with Vite, React, TypeScript, Tailwind CSS, and shadcn/ui. This application fetches real-time weather data from the OpenWeatherMap API and displays current conditions along with a 3-day forecast.

🌐 Live Demo
https://your-deployment-url.com

🚀 Features
Current Weather: Displays temperature, humidity, wind speed, and weather conditions.

3-Day Forecast: Provides a forecast for the next three days.

Search Functionality: Search for weather information by city name.

Responsive Design: Optimized for both desktop and mobile devices.

Animations: Visual animations for wind, humidity, sunrise, and sunset indicators.

🛠️ Technologies Used
Vite – Next Generation Frontend Tooling

React – JavaScript library for building user interfaces

TypeScript – Typed superset of JavaScript

Tailwind CSS – Utility-first CSS framework

shadcn/ui – Beautifully designed components

OpenWeatherMap API – Weather data API

📦 Installation
Clone the repository:

bash
Copy
Edit
git clone https://github.com/your-username/weather-dashboard.git
cd weather-dashboard
Install dependencies:

bash
Copy
Edit
npm install
Set up environment variables:

Create a .env file in the root directory and add your OpenWeatherMap API key:

env
Copy
Edit
VITE_OPENWEATHER_API_KEY=your_api_key_here
Start the development server:

bash
Copy
Edit
npm run dev
The application will be available at http://localhost:5173.

🧪 Testing
To run tests (if implemented):

bash
Copy
Edit
npm run test
📁 Project Structure
bash
Copy
Edit
├── public/               # Static assets
├── src/
│   ├── components/       # Reusable UI components
│   ├── services/         # API calls and data fetching
│   ├── App.tsx           # Root component
│   ├── main.tsx          # Entry point
├── .env                  # Environment variables
├── index.html            # HTML template
├── package.json          # Project metadata and scripts
├── tailwind.config.js    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
📄 License
This project is licensed under the MIT License.

