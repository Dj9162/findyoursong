import SearchBar from "@/components/SearchBar";
import SongGrid from "@/components/SongGrid";
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
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border/50">
        <div className="container py-4 flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Music className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-gradient hidden sm:block">SoundSearch</span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container py-12 md:py-20">
        <div className="text-center mb-10 md:mb-14">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight">
            <span className="text-foreground">Find Your </span>
            <span className="text-gradient">Perfect Sound</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Search millions of songs by typing or using your voice. Preview tracks instantly!
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
      <section className="container pb-20 mt-8">
        {hasSearched && songs.length > 0 && (
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">
              Found <span className="text-primary">{songs.length}</span> songs for "{searchQuery}"
            </h2>
          </div>
        )}
        <SongGrid songs={songs} isLoading={isLoading} hasSearched={hasSearched} />
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8">
        <div className="container text-center">
          <p className="text-sm text-muted-foreground">
            Powered by iTunes Search API • Preview 30 seconds of any track
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
