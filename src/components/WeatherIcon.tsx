
import { 
  Cloud, 
  CloudDrizzle, 
  CloudLightning, 
  CloudRain, 
  CloudSnow, 
  Sun, 
  Moon, 
  CloudSun,
  CloudMoon,
  Umbrella,
  Wind
} from "lucide-react";

interface WeatherIconProps {
  iconCode: string;
  className?: string;
  size?: number;
}

const WeatherIcon = ({ iconCode, className = "", size = 24 }: WeatherIconProps) => {
  // Map OpenWeatherMap icon codes to Lucide icons
  const getIconComponent = () => {
    // First digit of icon code represents weather condition
    // Last character (d/n) represents day or night
    const isDayTime = iconCode.endsWith('d');
    
    switch (iconCode.slice(0, 2)) {
      case '01': // clear sky
        return isDayTime ? <Sun size={size} className={`text-yellow-400 ${className}`} /> : <Moon size={size} className={`text-gray-200 ${className}`} />;
      case '02': // few clouds
        return isDayTime ? <CloudSun size={size} className={className} /> : <CloudMoon size={size} className={className} />;
      case '03': // scattered clouds
      case '04': // broken clouds
        return <Cloud size={size} className={className} />;
      case '09': // shower rain
        return <CloudDrizzle size={size} className={className} />;
      case '10': // rain
        return <CloudRain size={size} className={className} />;
      case '11': // thunderstorm
        return <CloudLightning size={size} className={className} />;
      case '13': // snow
        return <CloudSnow size={size} className={className} />;
      case '50': // mist
        return <Umbrella size={size} className={className} />;
      default:
        return <Wind size={size} className={className} />;
    }
  };

  return (
    <div className={`animate-float ${className}`}>
      {getIconComponent()}
    </div>
  );
};

export default WeatherIcon;
