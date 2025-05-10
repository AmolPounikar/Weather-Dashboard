
import { Card } from "@/components/ui/card";
import WeatherIcon from "./WeatherIcon";

interface ForecastCardProps {
  date: string;
  temp: number;
  minTemp: number;
  maxTemp: number;
  description: string;
  icon: string;
  delay?: number;
}

const ForecastCard = ({ 
  date, 
  temp, 
  minTemp, 
  maxTemp, 
  description, 
  icon,
  delay = 0
}: ForecastCardProps) => {
  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Card 
      className="glass-card p-4 text-center animate-fade-in" 
      style={{ 
        animationDelay: `${delay * 0.1}s`,
        opacity: 0
      }}
    >
      <p className="text-sm font-medium text-muted-foreground">{formatDate(date)}</p>
      
      <div className="my-3">
        <WeatherIcon iconCode={icon} size={36} className="mx-auto" />
      </div>
      
      <p className="text-2xl font-bold">{Math.round(temp)}°C</p>
      
      <div className="flex justify-center gap-2 text-sm mt-1">
        <span className="text-muted-foreground">L: {Math.round(minTemp)}°</span>
        <span className="text-muted-foreground">H: {Math.round(maxTemp)}°</span>
      </div>
      
      <p className="text-sm capitalize mt-2 text-muted-foreground">{description}</p>
    </Card>
  );
};

export default ForecastCard;
