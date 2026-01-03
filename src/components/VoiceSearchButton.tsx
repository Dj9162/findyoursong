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
      className={cn(
        "relative p-3 rounded-full transition-all duration-300",
        isListening
          ? "bg-primary text-primary-foreground animate-pulse-glow"
          : "bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground"
      )}
      title={isListening ? "Stop listening" : "Search with voice"}
    >
      {isListening ? (
        <>
          <MicOff className="h-5 w-5 relative z-10" />
          {/* Pulsing rings */}
          <span className="absolute inset-0 rounded-full bg-primary/30 animate-ping" />
          <span className="absolute inset-[-4px] rounded-full border-2 border-primary/50 animate-pulse" />
        </>
      ) : (
        <Mic className="h-5 w-5" />
      )}
    </button>
  );
};

export default VoiceSearchButton;
