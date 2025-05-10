// src/components/WeatherCard.tsx
import { Card } from "@/components/ui/card";
import WeatherIcon from "./WeatherIcon";
import { WeatherData } from "@/services/weatherService";
import { WiHumidity, WiStrongWind, WiSunrise, WiSunset } from "react-icons/wi";

interface WeatherCardProps {
  data: WeatherData;
  className?: string;
}

const WeatherCard = ({ data, className = "" }: WeatherCardProps) => {
  const formatTime = (timestamp: number): string => {
    return new Date(timestamp * 1000).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Card className={`glass-card overflow-hidden animate-fade-in ${className}`}>
      <div className="p-6 flex flex-col md:flex-row items-center gap-4">
        <div className="flex items-center justify-center p-4 md:p-6 rounded-full bg-secondary/30">
          <WeatherIcon
            iconCode={data.weather[0].icon}
            size={64}
            className="text-primary"
          />
        </div>

        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl font-bold">
            {data.name}, {data.sys.country}
          </h1>
          <p className="text-xl capitalize mt-2">
            {data.weather[0].description}
          </p>
          <p className="text-5xl font-bold">{Math.round(data.main.temp)}°C</p>
          <p className="text-xl text-muted-foreground">
            Feels like {Math.round(data.main.feels_like)}°C
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 bg-secondary/20 text-center">
        <div className="animate-pulse">
          <WiHumidity size={36} className="mx-auto text-blue-500" />
          <p className="text-muted-foreground">Humidity</p>
          <p className="text-lg font-medium">{data.main.humidity}%</p>
        </div>
        <div className="animate-pulse">
          <WiStrongWind size={36} className="mx-auto text-green-500" />
          <p className="text-muted-foreground">Wind</p>
          <p className="text-lg font-medium">
            {Math.round(data.wind.speed)} m/s
          </p>
        </div>
        <div className="animate-pulse">
          <WiSunrise size={36} className="mx-auto text-yellow-500" />
          <p className="text-muted-foreground">Sunrise</p>
          <p className="text-lg font-medium">{formatTime(data.sys.sunrise)}</p>
        </div>
        <div className="animate-pulse">
          <WiSunset size={36} className="mx-auto text-orange-500" />
          <p className="text-muted-foreground">Sunset</p>
          <p className="text-lg font-medium">{formatTime(data.sys.sunset)}</p>
        </div>
      </div>
    </Card>
  );
};

export default WeatherCard;
