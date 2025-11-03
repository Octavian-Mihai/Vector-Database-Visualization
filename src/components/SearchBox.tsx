import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Search } from "lucide-react";
import { getEmbedding } from "@/utils/embeddings";
import { cosineSimilarity } from "@/utils/similarity";
import { getEntries, type VectorEntry } from "@/utils/storage";

export interface SearchResult extends VectorEntry {
  similarity: number;
}

interface SearchBoxProps {
  onSearchResults: (results: SearchResult[]) => void;
}

export function SearchBox({ onSearchResults }: SearchBoxProps) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!query.trim()) {
      onSearchResults([]);
      return;
    }

    // Debounce search
    const timeout = setTimeout(() => {
      performSearch(query);
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  const performSearch = (searchQuery: string) => {
    const entries = getEntries();
    
    if (entries.length === 0) {
      onSearchResults([]);
      return;
    }

    const queryEmbedding = getEmbedding(searchQuery);
    
    const results: SearchResult[] = entries.map(entry => ({
      ...entry,
      similarity: cosineSimilarity(queryEmbedding, entry.embedding),
    }));

    // Sort by similarity (highest first) and take top 10
    results.sort((a, b) => b.similarity - a.similarity);
    onSearchResults(results.slice(0, 10));
  };

  return (
    <Card className="p-6 shadow-card">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Search className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">Search Vectors</h2>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Enter query to find similar entries..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {query && (
          <p className="text-sm text-muted-foreground">
            Searching across all stored vectors...
          </p>
        )}
      </div>
    </Card>
  );
}
