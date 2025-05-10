
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { toast } from '@/components/ui/use-toast';
import { 
  fetchWeatherByCity, 
  fetchWeatherByCoords, 
  fetchForecast,
  fetchForecastByCoords,
  WeatherData,
  ForecastData
} from '@/services/weatherService';

export const useWeather = () => {
  const [city, setCity] = useState<string>('London');
  const [coords, setCoords] = useState<{lat: number, lon: number} | null>(null);
  const [isUsingGeolocation, setIsUsingGeolocation] = useState<boolean>(false);

  // Try to get user's location on initial load
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoords({
            lat: position.coords.latitude,
            lon: position.coords.longitude
          });
          setIsUsingGeolocation(true);
        },
        (error) => {
          console.error("Geolocation error:", error);
          toast({
            title: "Location Access Denied",
            description: "Showing default weather for London instead.",
          });
        }
      );
    }
  }, []);

  // Query for current weather data
  const { 
    data: weatherData,
    isLoading: isLoadingWeather,
    isError: isWeatherError,
    error: weatherError,
    refetch: refetchWeather
  } = useQuery({
    queryKey: ['weather', isUsingGeolocation ? coords : city],
    queryFn: async () => {
      try {
        if (isUsingGeolocation && coords) {
          return await fetchWeatherByCoords(coords.lat, coords.lon);
        } else {
          return await fetchWeatherByCity(city);
        }
      } catch (error) {
        toast({
          title: "Weather Data Error",
          description: "Could not fetch current weather data. Please try again.",
          variant: "destructive"
        });
        throw error;
      }
    },
    enabled: !!(isUsingGeolocation ? coords : city),
    retry: 1,
  });

  // Query for forecast data
  const { 
    data: forecastData,
    isLoading: isLoadingForecast,
    isError: isForecastError,
    error: forecastError,
    refetch: refetchForecast
  } = useQuery({
    queryKey: ['forecast', isUsingGeolocation ? coords : city],
    queryFn: async () => {
      try {
        if (isUsingGeolocation && coords) {
          return await fetchForecastByCoords(coords.lat, coords.lon);
        } else {
          return await fetchForecast(city);
        }
      } catch (error) {
        toast({
          title: "Forecast Data Error",
          description: "Could not fetch forecast data. Please try again.",
          variant: "destructive"
        });
        throw error;
      }
    },
    enabled: !!(isUsingGeolocation ? coords : city),
    retry: 1,
  });

  // Process forecast data to get daily forecasts
  const dailyForecasts = forecastData?.list?.reduce<Record<string, typeof forecastData.list[0]>>((acc, item) => {
    const date = new Date(item.dt * 1000).toLocaleDateString();
    // Take the forecast for midday (12:00) as representative for the day
    if (!acc[date] || item.dt_txt.includes('12:00')) {
      acc[date] = item;
    }
    return acc;
  }, {});

  // Handle search
  const handleSearch = (searchCity: string) => {
    if (searchCity.trim()) {
      setCity(searchCity);
      setIsUsingGeolocation(false);
      toast({
        title: "Searching",
        description: `Getting weather data for ${searchCity}...`,
      });
    }
  };

  // Use current location
  const useCurrentLocation = () => {
    if (navigator.geolocation) {
      toast({
        title: "Locating",
        description: "Getting your current location...",
      });
      
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoords({
            lat: position.coords.latitude,
            lon: position.coords.longitude
          });
          setIsUsingGeolocation(true);
          toast({
            title: "Location Found",
            description: "Fetching weather for your location",
          });
        },
        (error) => {
          console.error("Geolocation error:", error);
          toast({
            title: "Location Access Denied",
            description: "Please enable location access or search for a city.",
            variant: "destructive"
          });
        }
      );
    } else {
      toast({
        title: "Geolocation Not Supported",
        description: "Your browser doesn't support geolocation.",
        variant: "destructive"
      });
    }
  };

  // Refetch data when parameters change
  useEffect(() => {
    if (isUsingGeolocation && coords) {
      refetchWeather();
      refetchForecast();
    } else if (city) {
      refetchWeather();
      refetchForecast();
    }
  }, [isUsingGeolocation, coords, city, refetchWeather, refetchForecast]);

  return {
    weatherData,
    forecastData,
    dailyForecasts: dailyForecasts ? Object.values(dailyForecasts).slice(0, 5) : [],
    isLoadingWeather,
    isLoadingForecast,
    isWeatherError,
    isForecastError,
    weatherError,
    forecastError,
    city,
    handleSearch,
    useCurrentLocation,
  };
};
