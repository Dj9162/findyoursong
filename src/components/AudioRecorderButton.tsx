import { Mic, Square, Loader2, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface AudioRecorderButtonProps {
  isRecording: boolean;
  isProcessing: boolean;
  recordingTime: string;
  onStart: () => void;
  onStop: () => void;
  onCancel: () => void;
}

const AudioRecorderButton = ({ 
  isRecording, 
  isProcessing, 
  recordingTime,
  onStart, 
  onStop,
  onCancel 
}: AudioRecorderButtonProps) => {
  if (isProcessing) {
    return (
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-4 py-2 bg-secondary/50 rounded-full">
          <Loader2 className="h-5 w-5 text-primary animate-spin" />
          <span className="text-sm text-foreground">Processing audio...</span>
        </div>
      </div>
    );
  }

  if (isRecording) {
    return (
      <div className="flex items-center gap-3">
        {/* Cancel button */}
        <button
          onClick={onCancel}
          type="button"
          className="p-3 rounded-full bg-secondary/70 text-muted-foreground hover:bg-secondary hover:text-foreground transition-all"
          title="Cancel recording"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Recording indicator */}
        <div className="flex items-center gap-3 px-4 py-2 bg-destructive/10 border border-destructive/30 rounded-full">
          <div className="relative">
            <div className="w-3 h-3 bg-destructive rounded-full animate-pulse" />
            <div className="absolute inset-0 w-3 h-3 bg-destructive rounded-full animate-ping opacity-50" />
          </div>
          <span className="text-sm font-mono text-destructive font-medium">{recordingTime}</span>
          
          {/* Audio wave visualization */}
          <div className="flex items-center gap-0.5 h-6">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-1 bg-destructive rounded-full animate-bounce"
                style={{
                  height: `${Math.random() * 16 + 8}px`,
                  animationDelay: `${i * 100}ms`,
                  animationDuration: '0.5s'
                }}
              />
            ))}
          </div>
        </div>

        {/* Stop button */}
        <button
          onClick={onStop}
          type="button"
          className="p-3.5 rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-all shadow-lg hover:scale-105"
          title="Stop recording and search"
        >
          <Square className="h-5 w-5 fill-current" />
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={onStart}
      type="button"
      className={cn(
        "relative p-3.5 rounded-full transition-all duration-300 flex-shrink-0",
        "bg-secondary/70 text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:scale-105 hover:shadow-lg"
      )}
      title="Tap to record audio and search for songs"
    >
      <Mic className="h-5 w-5" />
    </button>
  );
};

export default AudioRecorderButton;
