import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
  isLoading?: boolean;
}

const SearchBar = ({ value, onChange, onClear, isLoading }: SearchBarProps) => {
  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search for songs, artists, or albums..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="search-input w-full h-14 pl-12 pr-12 text-lg rounded-2xl bg-secondary/50 border-border/50 placeholder:text-muted-foreground/60 focus-visible:ring-primary/30"
        />
        {value && (
          <button
            onClick={onClear}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-muted/50 transition-colors"
          >
            <X className="h-5 w-5 text-muted-foreground" />
          </button>
        )}
      </div>
      {isLoading && (
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent animate-pulse" />
      )}
    </div>
  );
};

export default SearchBar;
