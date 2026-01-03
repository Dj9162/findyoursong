import { Search, X, Mic, Square, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect, useRef, useCallback } from "react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onVoiceSearch: (value: string) => void;
  onClear: () => void;
  isLoading?: boolean;
}

const SearchBar = ({ value, onChange, onVoiceSearch, onClear, isLoading }: SearchBarProps) => {
  const { toast } = useToast();
  const [showTip, setShowTip] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    const hasSeenTip = localStorage.getItem('voiceSearchTipSeen');
    if (!hasSeenTip) {
      setShowTip(true);
      setTimeout(() => {
        setShowTip(false);
        localStorage.setItem('voiceSearchTipSeen', 'true');
      }, 4000);
    }
  }, []);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    setIsListening(false);
  }, []);

  const startListening = useCallback(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      toast({
        title: "Not supported",
        description: "Speech recognition is not supported. Try Chrome or Edge.",
        variant: "destructive",
      });
      return;
    }

    // Stop any existing recognition
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onstart = () => {
      setIsListening(true);
      toast({
        title: "🎤 Listening...",
        description: "Say a song, movie, artist, or lyrics",
      });
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      toast({
        title: "🔍 Searching",
        description: `"${transcript}"`,
      });
      onVoiceSearch(transcript);
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error("Recognition error:", event.error);
      if (event.error !== 'aborted') {
        toast({
          title: "Could not recognize",
          description: "Please try again or type your search",
          variant: "destructive",
        });
      }
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
      recognitionRef.current = null;
    };

    recognitionRef.current = recognition;
    recognition.start();
  }, [onVoiceSearch, toast]);

  const handleMicClick = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  return (
    <div className="relative w-full max-w-2xl mx-auto px-4 md:px-0">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
        
        <Input
          type="text"
          placeholder={isListening ? "Listening..." : "Song, movie, artist, or lyrics..."}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={isListening}
          className={`search-input w-full h-12 md:h-14 pl-12 pr-20 text-base md:text-lg rounded-2xl bg-secondary/50 border-border/50 placeholder:text-muted-foreground/60 focus-visible:ring-primary/30 transition-all duration-300 ${
            isListening ? "border-primary/50 ring-2 ring-primary/30 bg-primary/5" : ""
          }`}
        />

        {/* Right side controls */}
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
          {/* Clear button */}
          {value && !isListening && (
            <button
              onClick={onClear}
              className="p-2 rounded-full hover:bg-muted/50 transition-colors"
            >
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
          )}

          {/* Mic button */}
          <button
            onClick={handleMicClick}
            className={`relative p-2.5 md:p-3 rounded-full transition-all duration-200 ${
              isListening 
                ? "bg-primary text-primary-foreground" 
                : "bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            {isListening ? (
              <Square className="h-4 w-4 fill-current" />
            ) : (
              <Mic className="h-5 w-5" />
            )}

            {/* Listening pulse rings */}
            {isListening && (
              <>
                <span className="absolute inset-0 rounded-full bg-primary/30 animate-ping" />
                <span className="absolute -inset-1 rounded-full border-2 border-primary/50 animate-pulse" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* Search hints */}
      <div className="flex flex-wrap justify-center gap-2 mt-4 text-xs text-muted-foreground/70">
        <span className="px-2 py-1 rounded-full bg-muted/30">🎬 Movie soundtracks</span>
        <span className="px-2 py-1 rounded-full bg-muted/30">🎤 Artist names</span>
        <span className="px-2 py-1 rounded-full bg-muted/30">🎵 Song lyrics</span>
      </div>

      {/* First-time tip */}
      {showTip && !isListening && (
        <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs md:text-sm px-4 py-2 rounded-xl shadow-lg animate-fade-in whitespace-nowrap">
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-primary" />
          Tap 🎤 to search by voice!
        </div>
      )}

      {/* Loading bar */}
      {isLoading && !isListening && (
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1/3 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent animate-pulse rounded-full" />
      )}
    </div>
  );
};

export default SearchBar;
