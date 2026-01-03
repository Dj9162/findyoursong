import SearchBar from "@/components/SearchBar";
import SongGrid from "@/components/SongGrid";
import MiniPlayer from "@/components/MiniPlayer";
import { useMusicSearch } from "@/hooks/useMusicSearch";
import { Music } from "lucide-react";

const Index = () => {
  const { 
    searchQuery, 
    songs, 
    isLoading, 
    hasSearched, 
    handleSearch, 
    triggerImmediateSearch,
    clearSearch 
  } = useMusicSearch();

  return (
    <div className="min-h-screen pb-safe">
      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-background/80 border-b border-border/50 pt-safe">
        <div className="container py-3 md:py-4 flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Music className="h-4 w-4 md:h-5 md:w-5 text-primary-foreground" />
            </div>
            <span className="text-lg md:text-xl font-bold text-gradient">SoundSearch</span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container py-8 md:py-16">
        <div className="text-center mb-8 md:mb-12 px-4">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-3 md:mb-4 tracking-tight">
            <span className="text-foreground">Find Your </span>
            <span className="text-gradient">Perfect Sound</span>
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto">
            Search by song name, movie, artist, or lyrics
          </p>
        </div>

        <SearchBar
          value={searchQuery}
          onChange={handleSearch}
          onVoiceSearch={triggerImmediateSearch}
          onClear={clearSearch}
          isLoading={isLoading}
        />
      </section>

      {/* Results Section */}
      <section className="container px-3 md:px-4 pb-8">
        {hasSearched && songs.length > 0 && (
          <div className="mb-4 md:mb-6 flex items-center justify-between px-1">
            <h2 className="text-sm md:text-lg font-semibold text-foreground">
              <span className="text-primary">{songs.length}</span> results for "{searchQuery}"
            </h2>
          </div>
        )}
        <SongGrid songs={songs} isLoading={isLoading} hasSearched={hasSearched} />
      </section>

      {/* Mini Player */}
      <MiniPlayer />

      {/* Footer - only show when no mini player */}
      <footer className="border-t border-border/50 py-6 md:py-8">
        <div className="container text-center px-4">
          <p className="text-xs md:text-sm text-muted-foreground">
            Powered by iTunes • 30-second previews
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
