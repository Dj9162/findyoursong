import { Play, Pause, ExternalLink } from "lucide-react";
import { useAudioPlayer } from "@/contexts/AudioPlayerContext";

interface Song {
  trackId: number;
  trackName: string;
  artistName: string;
  collectionName: string;
  artworkUrl100: string;
  previewUrl: string;
  trackViewUrl: string;
}

interface SongCardProps {
  song: Song;
  index: number;
}

const SongCard = ({ song, index }: SongCardProps) => {
  const { currentSong, isPlaying, playSong, togglePlay } = useAudioPlayer();
  
  const isCurrentSong = currentSong?.trackId === song.trackId;
  const isThisPlaying = isCurrentSong && isPlaying;

  const handlePlay = () => {
    if (isCurrentSong) {
      togglePlay();
    } else {
      playSong(song);
    }
  };

  const artworkLarge = song.artworkUrl100.replace("100x100", "300x300");

  return (
    <div
      className={`song-card group rounded-xl overflow-hidden animate-fade-in ${
        isCurrentSong ? "ring-2 ring-primary/50" : ""
      }`}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="relative aspect-square overflow-hidden">
        <img
          src={artworkLarge}
          alt={song.trackName}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className={`absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent transition-opacity duration-300 ${
          isCurrentSong ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        }`} />
        
        {song.previewUrl && (
          <button
            onClick={handlePlay}
            className={`play-button absolute bottom-3 right-3 w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
              isCurrentSong 
                ? "opacity-100 translate-y-0" 
                : "opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0"
            }`}
          >
            {isThisPlaying ? (
              <Pause className="h-5 w-5 text-primary-foreground" />
            ) : (
              <Play className="h-5 w-5 text-primary-foreground ml-0.5" />
            )}
          </button>
        )}

        {/* Now playing indicator */}
        {isThisPlaying && (
          <div className="absolute top-3 left-3 flex items-center gap-1 px-2 py-1 rounded-full bg-primary/90 backdrop-blur-sm">
            <div className="flex gap-0.5">
              <span className="w-0.5 h-3 bg-primary-foreground rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
              <span className="w-0.5 h-3 bg-primary-foreground rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
              <span className="w-0.5 h-3 bg-primary-foreground rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
            <span className="text-[10px] text-primary-foreground font-medium ml-1">PLAYING</span>
          </div>
        )}
      </div>

      <div className="p-3 md:p-4 space-y-1">
        <h3 className="font-semibold text-sm md:text-base text-foreground truncate group-hover:text-primary transition-colors">
          {song.trackName}
        </h3>
        <p className="text-xs md:text-sm text-muted-foreground truncate">{song.artistName}</p>
        <p className="text-xs text-muted-foreground/60 truncate">{song.collectionName}</p>
      </div>

      <a
        href={song.trackViewUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-3 right-3 p-2 rounded-full bg-background/50 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-background/80"
      >
        <ExternalLink className="h-4 w-4 text-foreground" />
      </a>
    </div>
  );
};

export default SongCard;
