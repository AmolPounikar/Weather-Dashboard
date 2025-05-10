
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';

interface SearchBarProps {
  onSearch: (city: string) => void;
  onUseLocation: () => void;
}

const SearchBar = ({ onSearch, onUseLocation }: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
    } else {
      toast({
        title: "Search Error",
        description: "Please enter a city name",
        variant: "destructive"
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-xl mx-auto mb-6 animate-fade-in">
      <Input
        type="text"
        placeholder="Enter city name..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="flex-1 bg-secondary/50 text-foreground border-none focus-visible:ring-accent"
      />
      <div className="flex gap-2">
        <Button type="submit" variant="default" className="flex-1 sm:flex-none">
          Search
        </Button>
        <Button type="button" variant="outline" onClick={onUseLocation} className="flex-1 sm:flex-none">
          My Location
        </Button>
      </div>
    </form>
  );
};

export default SearchBar;
