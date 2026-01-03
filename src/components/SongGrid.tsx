import SongCard from "./SongCard";
import { Music2 } from "lucide-react";

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
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="song-card rounded-xl overflow-hidden animate-pulse">
            <div className="aspect-square bg-muted" />
            <div className="p-4 space-y-2">
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
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-20 h-20 rounded-full bg-muted/50 flex items-center justify-center mb-6">
          <Music2 className="h-10 w-10 text-muted-foreground" />
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">No songs found</h3>
        <p className="text-muted-foreground max-w-md">
          We couldn't find any songs matching your search. Try different keywords or check the spelling.
        </p>
      </div>
    );
  }

  if (!hasSearched) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center glow-effect">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-6 animate-pulse-glow">
          <Music2 className="h-12 w-12 text-primary" />
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-3">Discover Music</h3>
        <p className="text-muted-foreground max-w-md">
          Search for your favorite songs, artists, or albums and preview them instantly.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
      {songs.map((song, index) => (
        <SongCard key={song.trackId} song={song} index={index} />
      ))}
    </div>
  );
};

export default SongGrid;
