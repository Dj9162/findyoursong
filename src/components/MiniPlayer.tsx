import { Play, Pause, X, SkipBack, SkipForward, ExternalLink } from "lucide-react";
import { useAudioPlayer } from "@/contexts/AudioPlayerContext";
import { Slider } from "@/components/ui/slider";

const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

const MiniPlayer = () => {
  const { currentSong, isPlaying, currentTime, duration, togglePlay, seekTo, closeMiniPlayer } = useAudioPlayer();

  if (!currentSong) return null;

  const artworkLarge = currentSong.artworkUrl100.replace("100x100", "300x300");
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 safe-area-bottom">
      {/* Backdrop blur background */}
      <div className="absolute inset-0 bg-background/95 backdrop-blur-xl border-t border-border/50" />
      
      <div className="relative container py-3 px-4">
        {/* Progress bar - clickable on top */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-muted/30">
          <div 
            className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex items-center gap-3 md:gap-4">
          {/* Artwork */}
          <div className="relative shrink-0">
            <img
              src={artworkLarge}
              alt={currentSong.trackName}
              className="w-12 h-12 md:w-14 md:h-14 rounded-lg object-cover shadow-lg"
            />
            {isPlaying && (
              <div className="absolute inset-0 rounded-lg border-2 border-primary/50 animate-pulse" />
            )}
          </div>

          {/* Song info */}
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-foreground text-sm md:text-base truncate">
              {currentSong.trackName}
            </h4>
            <p className="text-xs md:text-sm text-muted-foreground truncate">
              {currentSong.artistName}
            </p>
          </div>

          {/* Time display - hidden on mobile */}
          <div className="hidden md:flex items-center gap-2 text-xs text-muted-foreground shrink-0">
            <span>{formatTime(currentTime)}</span>
            <div className="w-24 lg:w-40">
              <Slider
                value={[currentTime]}
                max={duration || 30}
                step={0.1}
                onValueChange={([value]) => seekTo(value)}
                className="cursor-pointer"
              />
            </div>
            <span>{formatTime(duration)}</span>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-1 md:gap-2 shrink-0">
            {/* Main play/pause button */}
            <button
              onClick={togglePlay}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center shadow-lg hover:scale-105 transition-transform active:scale-95"
            >
              {isPlaying ? (
                <Pause className="h-5 w-5 md:h-6 md:w-6 text-primary-foreground" />
              ) : (
                <Play className="h-5 w-5 md:h-6 md:w-6 text-primary-foreground ml-0.5" />
              )}
            </button>

            {/* External link */}
            <a
              href={currentSong.trackViewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-muted/50 transition-colors hidden sm:flex"
            >
              <ExternalLink className="h-4 w-4 text-muted-foreground" />
            </a>

            {/* Close button */}
            <button
              onClick={closeMiniPlayer}
              className="p-2 rounded-full hover:bg-muted/50 transition-colors"
            >
              <X className="h-5 w-5 text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* Mobile time display */}
        <div className="flex md:hidden items-center gap-2 mt-2 text-xs text-muted-foreground">
          <span>{formatTime(currentTime)}</span>
          <div className="flex-1">
            <Slider
              value={[currentTime]}
              max={duration || 30}
              step={0.1}
              onValueChange={([value]) => seekTo(value)}
              className="cursor-pointer"
            />
          </div>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );
};

export default MiniPlayer;
