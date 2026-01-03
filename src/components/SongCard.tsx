import { Play, Pause, ExternalLink } from "lucide-react";
import { useState, useRef } from "react";

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
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(song.previewUrl);
      audioRef.current.addEventListener("ended", () => setIsPlaying(false));
    }

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const artworkLarge = song.artworkUrl100.replace("100x100", "300x300");

  return (
    <div
      className="song-card group rounded-xl overflow-hidden animate-fade-in"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="relative aspect-square overflow-hidden">
        <img
          src={artworkLarge}
          alt={song.trackName}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {song.previewUrl && (
          <button
            onClick={togglePlay}
            className="play-button absolute bottom-4 right-4 w-12 h-12 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0"
          >
            {isPlaying ? (
              <Pause className="h-5 w-5 text-primary-foreground" />
            ) : (
              <Play className="h-5 w-5 text-primary-foreground ml-0.5" />
            )}
          </button>
        )}
      </div>

      <div className="p-4 space-y-1">
        <h3 className="font-semibold text-foreground truncate group-hover:text-primary transition-colors">
          {song.trackName}
        </h3>
        <p className="text-sm text-muted-foreground truncate">{song.artistName}</p>
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
