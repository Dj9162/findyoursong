import { useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";

interface Song {
  trackId: number;
  trackName: string;
  artistName: string;
  collectionName: string;
  artworkUrl100: string;
  previewUrl: string;
  trackViewUrl: string;
}

interface ITunesResponse {
  resultCount: number;
  results: Song[];
}

const searchMusic = async (query: string): Promise<Song[]> => {
  if (!query.trim()) return [];
  
  const response = await fetch(
    `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&media=music&entity=song&limit=20`
  );
  
  if (!response.ok) {
    throw new Error("Failed to fetch songs");
  }
  
  const data: ITunesResponse = await response.json();
  return data.results;
};

export const useMusicSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  const { data: songs = [], isLoading, isFetching } = useQuery({
    queryKey: ["music-search", debouncedQuery],
    queryFn: () => searchMusic(debouncedQuery),
    enabled: debouncedQuery.length > 0,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const handleSearch = useCallback((value: string) => {
    setSearchQuery(value);
    
    // Simple debounce using setTimeout
    const timeoutId = setTimeout(() => {
      setDebouncedQuery(value);
    }, 400);

    return () => clearTimeout(timeoutId);
  }, []);

  const clearSearch = useCallback(() => {
    setSearchQuery("");
    setDebouncedQuery("");
  }, []);

  return {
    searchQuery,
    songs,
    isLoading: isLoading || isFetching,
    hasSearched: debouncedQuery.length > 0,
    handleSearch,
    clearSearch,
  };
};
