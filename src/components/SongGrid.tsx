import SongCard from "./SongCard";
import { Music2, Film, Mic2, MusicIcon } from "lucide-react";

interface Song {
  trackId: number;
  trackName: string;
  artistName: string;
  collectionName: string;
  artworkUrl100: string;
  previewUrl: string;
  trackViewUrl: string;
}

interface SongGridProps {
  songs: Song[];
  isLoading: boolean;
  hasSearched: boolean;
}

const SongGrid = ({ songs, isLoading, hasSearched }: SongGridProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="song-card rounded-xl overflow-hidden animate-pulse">
            <div className="aspect-square bg-muted" />
            <div className="p-3 md:p-4 space-y-2">
              <div className="h-4 bg-muted rounded w-3/4" />
              <div className="h-3 bg-muted rounded w-1/2" />
              <div className="h-3 bg-muted rounded w-2/3" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (hasSearched && songs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 md:py-20 text-center px-4">
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-muted/50 flex items-center justify-center mb-4 md:mb-6">
          <Music2 className="h-8 w-8 md:h-10 md:w-10 text-muted-foreground" />
        </div>
        <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2">No songs found</h3>
        <p className="text-sm md:text-base text-muted-foreground max-w-md">
          Try different keywords like movie names, artist names, or song lyrics.
        </p>
      </div>
    );
  }

  if (!hasSearched) {
    return (
      <div className="flex flex-col items-center justify-center py-12 md:py-20 text-center px-4 glow-effect">
        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-6 animate-pulse">
          <Music2 className="h-10 w-10 md:h-12 md:w-12 text-primary" />
        </div>
        <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">Discover Music</h3>
        <p className="text-sm md:text-base text-muted-foreground max-w-md mb-6">
          Search for songs, artists, movies, or even lyrics
        </p>
        
        {/* Feature cards */}
        <div className="grid grid-cols-3 gap-3 md:gap-4 w-full max-w-sm">
          <div className="flex flex-col items-center p-3 md:p-4 rounded-xl bg-muted/30 border border-border/30">
            <Film className="h-5 w-5 md:h-6 md:w-6 text-primary mb-2" />
            <span className="text-xs text-muted-foreground text-center">Movie OST</span>
          </div>
          <div className="flex flex-col items-center p-3 md:p-4 rounded-xl bg-muted/30 border border-border/30">
            <Mic2 className="h-5 w-5 md:h-6 md:w-6 text-primary mb-2" />
            <span className="text-xs text-muted-foreground text-center">Voice Search</span>
          </div>
          <div className="flex flex-col items-center p-3 md:p-4 rounded-xl bg-muted/30 border border-border/30">
            <MusicIcon className="h-5 w-5 md:h-6 md:w-6 text-primary mb-2" />
            <span className="text-xs text-muted-foreground text-center">Lyrics</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6 pb-28">
      {songs.map((song, index) => (
        <SongCard key={song.trackId} song={song} index={index} />
      ))}
    </div>
  );
};

export default SongGrid;
