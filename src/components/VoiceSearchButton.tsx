import { Mic, MicOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface VoiceSearchButtonProps {
  isListening: boolean;
  isSupported: boolean;
  onClick: () => void;
}

const VoiceSearchButton = ({ isListening, isSupported, onClick }: VoiceSearchButtonProps) => {
  if (!isSupported) {
    return null;
  }

  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "relative p-3.5 rounded-full transition-all duration-300 flex-shrink-0",
        isListening
          ? "bg-primary text-primary-foreground shadow-lg"
          : "bg-secondary/70 text-muted-foreground hover:bg-secondary hover:text-foreground hover:scale-105"
      )}
      title={isListening ? "Stop listening" : "Search with voice"}
      aria-label={isListening ? "Stop voice search" : "Start voice search"}
    >
      {isListening ? (
        <>
          <MicOff className="h-5 w-5 relative z-10" />
          {/* Pulsing rings animation */}
          <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-30" />
          <span className="absolute inset-[-6px] rounded-full border-2 border-primary/40 animate-pulse" />
          <span className="absolute inset-[-12px] rounded-full border border-primary/20 animate-pulse" style={{ animationDelay: "150ms" }} />
        </>
      ) : (
        <Mic className="h-5 w-5" />
      )}
    </button>
  );
};

export default VoiceSearchButton;
