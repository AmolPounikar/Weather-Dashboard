import { useWeather } from "@/hooks/useWeather";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import SearchBar from "@/components/SearchBar";
import WeatherCard from "@/components/WeatherCard";
import ForecastCard from "@/components/ForecastCard";

const Index = () => {
  const {
    weatherData,
    dailyForecasts,
    isLoadingWeather,
    isLoadingForecast,
    isWeatherError,
    isForecastError,
    handleSearch,
    useCurrentLocation,
  } = useWeather();

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold mb-2">Weather Dashboard</h1>
          <p className="text-muted-foreground">
            Check current weather and forecasts for any city
          </p>
        </div>

        <SearchBar onSearch={handleSearch} onUseLocation={useCurrentLocation} />

        {(isWeatherError || isForecastError) && (
          <Alert variant="destructive" className="animate-fade-in">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Failed to fetch weather data. Please check the city name and try
              again.
            </AlertDescription>
          </Alert>
        )}

        {isLoadingWeather ? (
          <div className="space-y-4">
            <Skeleton className="h-[200px] w-full" />
            <div className="grid grid-cols-1 gap-4">
              <Skeleton className="h-[100px] w-full" />
            </div>
          </div>
        ) : weatherData ? (
          <WeatherCard data={weatherData} />
        ) : null}

        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4 animate-fade-in">
            5-Day Forecast
          </h2>

          {isLoadingForecast ? (
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-[180px] w-full" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {dailyForecasts.map((forecast, index) => (
                <ForecastCard
                  key={forecast.dt}
                  date={forecast.dt_txt}
                  temp={forecast.main.temp}
                  minTemp={forecast.main.temp_min}
                  maxTemp={forecast.main.temp_max}
                  description={forecast.weather[0].description}
                  icon={forecast.weather[0].icon}
                  delay={index}
                />
              ))}
            </div>
          )}
        </div>

        <footer className="text-center text-sm text-muted-foreground mt-12 pb-4 animate-fade-in">
          <p>Weather Dashboard. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
