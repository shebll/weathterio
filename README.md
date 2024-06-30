# WeaZerIo

WeaZerIo is a weather web app that provides accurate and up-to-date weather forecasts, including hourly and daily forecasts, weather alerts, and more.

- [WeaZerIo](https://weazerio.vercel.app/)

## Features

- Hourly and daily weather forecasts
- Real-time weather updates
- Modern and responsive UI

## Tech Stack

- [Vite](https://vitejs.dev/) - Fast build tool for modern web projects
- [React](https://reactjs.org/) - JavaScript library for building user interfaces
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework for styling
- [Axios](https://axios-http.com/) - Promise-based HTTP client for the browser and Node.js
- [OpenWeatherMap API](https://openweathermap.org/api) - Weather data provider

## Getting Started

Follow these instructions to set up and run the project on your local machine.

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [Yarn](https://yarnpkg.com/) or [npm](https://www.npmjs.com/)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/weazerio.git
   ```

2. Navigate to the project directory:

   ```bash
   cd weazerio
   ```

3. Install the dependencies:

   ```bash
   # using npm
   npm install or npm i

   # or using Yarn
   yarn install or yarn i

   # or using pnpm
   pnpm install or pnpm i
   ```

4. Create a `.env` file in the root of the project and add your OpenWeatherMap API key:

   ```env
   VITE_WEATHER_API_KEY=your_openweathermap_api_key
   VITE_CITIES_API_KEY=your_api.api-ninjas_api_key
   ```

### Running the App

To run the app in development mode, use the following command:

```bash
# using npm
npm run dev

# or using Yarn
yarn dev

# or using pnpm
pnpm dev
```
