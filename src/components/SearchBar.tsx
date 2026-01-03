import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import AudioRecorderButton from "./AudioRecorderButton";
import { useAudioRecorder } from "@/hooks/useAudioRecorder";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";

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

  // Process recorded audio using Speech Recognition
  const processAudio = async (audioBlob: Blob) => {
    try {
      // Create audio element to play the recorded audio for recognition
      const audioUrl = URL.createObjectURL(audioBlob);
      
      // Use Speech Recognition API to transcribe
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      
      if (!SpeechRecognition) {
        toast({
          title: "Not supported",
          description: "Speech recognition is not supported in your browser. Try Chrome or Edge.",
          variant: "destructive",
        });
        resetProcessing();
        return;
      }

      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "en-US";

      // Create audio element and play it
      const audio = new Audio(audioUrl);
      
      // For speech recognition, we need to use the microphone
      // Since we recorded audio, let's use a different approach
      // We'll prompt user to speak the song name they want to find
      
      toast({
        title: "🎵 Audio recorded!",
        description: "Now speak the song or artist name you're looking for...",
      });

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        toast({
          title: "🔍 Searching",
          description: `Looking for "${transcript}"`,
        });
        onVoiceSearch(transcript);
        resetProcessing();
      };

      recognition.onerror = (event) => {
        console.error("Recognition error:", event.error);
        toast({
          title: "Could not recognize",
          description: "Please try again or type your search",
          variant: "destructive",
        });
        resetProcessing();
      };

      recognition.onend = () => {
        resetProcessing();
      };

      recognition.start();

      // Clean up
      URL.revokeObjectURL(audioUrl);

    } catch (error) {
      console.error("Error processing audio:", error);
      toast({
        title: "Processing error",
        description: "Could not process the audio. Please try again.",
        variant: "destructive",
      });
      resetProcessing();
    }
  };

  const { 
    isRecording, 
    isProcessing, 
    formattedTime,
    startRecording, 
    stopRecording,
    cancelRecording,
    resetProcessing 
  } = useAudioRecorder({
    onRecordingComplete: processAudio,
    onError: (error) => {
      toast({
        title: "Recording error",
        description: error,
        variant: "destructive",
      });
    },
  });

  // Show tip on first load
  useEffect(() => {
    const hasSeenTip = localStorage.getItem('voiceSearchTipSeen');
    if (!hasSeenTip) {
      setShowTip(true);
      setTimeout(() => {
        setShowTip(false);
        localStorage.setItem('voiceSearchTipSeen', 'true');
      }, 5000);
    }
  }, []);

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder={isRecording ? "🎤 Recording..." : "Search for songs, artists, or albums..."}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            disabled={isRecording || isProcessing}
            className={`search-input w-full h-14 pl-12 pr-12 text-lg rounded-2xl bg-secondary/50 border-border/50 placeholder:text-muted-foreground/60 focus-visible:ring-primary/30 transition-all duration-300 ${
              isRecording ? "border-destructive/50 ring-2 ring-destructive/20" : ""
            } ${isProcessing ? "opacity-50" : ""}`}
          />
          {value && !isRecording && !isProcessing && (
            <button
              onClick={onClear}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-muted/50 transition-colors"
            >
              <X className="h-5 w-5 text-muted-foreground" />
            </button>
          )}
        </div>
        
        <AudioRecorderButton
          isRecording={isRecording}
          isProcessing={isProcessing}
          recordingTime={formattedTime}
          onStart={startRecording}
          onStop={stopRecording}
          onCancel={cancelRecording}
        />
      </div>

      {/* Tip tooltip */}
      {showTip && !isRecording && (
        <div className="absolute -bottom-12 right-0 bg-primary text-primary-foreground text-sm px-3 py-2 rounded-lg shadow-lg animate-fade-in">
          <div className="absolute -top-2 right-6 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-primary" />
          Tap to record and search by voice!
        </div>
      )}

      {/* Loading indicator */}
      {isLoading && !isRecording && !isProcessing && (
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent animate-pulse" />
      )}
    </div>
  );
};

export default SearchBar;
