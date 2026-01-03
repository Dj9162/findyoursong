import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import VoiceSearchButton from "./VoiceSearchButton";
import { useVoiceSearch } from "@/hooks/useVoiceSearch";
import { useToast } from "@/hooks/use-toast";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onVoiceSearch: (value: string) => void;
  onClear: () => void;
  isLoading?: boolean;
}

const SearchBar = ({ value, onChange, onVoiceSearch, onClear, isLoading }: SearchBarProps) => {
  const { toast } = useToast();

  const { isListening, isSupported, toggleListening } = useVoiceSearch({
    onResult: (transcript) => {
      toast({
        title: "🎤 Voice search",
        description: `Searching for "${transcript}"`,
      });
      onVoiceSearch(transcript);
    },
    onError: (error) => {
      toast({
        title: "Voice search error",
        description: error,
        variant: "destructive",
      });
    },
  });

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder={isListening ? "🎤 Listening..." : "Search for songs, artists, or albums..."}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={`search-input w-full h-14 pl-12 pr-12 text-lg rounded-2xl bg-secondary/50 border-border/50 placeholder:text-muted-foreground/60 focus-visible:ring-primary/30 transition-all duration-300 ${
              isListening ? "border-primary/50 ring-2 ring-primary/20" : ""
            }`}
          />
          {value && !isListening && (
            <button
              onClick={onClear}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-muted/50 transition-colors"
            >
              <X className="h-5 w-5 text-muted-foreground" />
            </button>
          )}
        </div>
        
        <VoiceSearchButton
          isListening={isListening}
          isSupported={isSupported}
          onClick={toggleListening}
        />
      </div>

      {/* Listening indicator */}
      {isListening && (
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2 text-primary">
          <div className="flex gap-1">
            <span className="w-1 h-4 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
            <span className="w-1 h-6 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
            <span className="w-1 h-4 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
            <span className="w-1 h-5 bg-primary rounded-full animate-bounce" style={{ animationDelay: "450ms" }} />
            <span className="w-1 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: "600ms" }} />
          </div>
          <span className="text-sm font-medium">Speak now...</span>
        </div>
      )}

      {/* Loading indicator */}
      {isLoading && !isListening && (
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent animate-pulse" />
      )}
    </div>
  );
};

export default SearchBar;
