import { useState, useEffect } from "react";
import { VectorInput } from "@/components/VectorInput";
import { SearchBox, type SearchResult } from "@/components/SearchBox";
import { ResultsTable } from "@/components/ResultsTable";
import { DataControls } from "@/components/DataControls";
import { getEntries } from "@/utils/storage";
import { Database, Zap, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const VectorApp = () => {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [allEntries, setAllEntries] = useState<SearchResult[]>([]);
  const [updateTrigger, setUpdateTrigger] = useState(0);

  useEffect(() => {
    loadAllEntries();
  }, [updateTrigger]);

  const loadAllEntries = () => {
    const entries = getEntries();
    setAllEntries(entries.map(e => ({ ...e, similarity: 1 })));
  };

  const handleUpdate = () => {
    setUpdateTrigger(prev => prev + 1);
    setSearchResults([]);
  };

  const displayResults = searchResults.length > 0 ? searchResults : allEntries;
  const showAllEntries = searchResults.length === 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-gradient-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-primary">
                <Database className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Vector Database Visualization</h1>
                <p className="text-sm text-muted-foreground">
                  Client-side vector database with similarity search
                </p>
                <p className="text-sm text-muted-foreground">
                  Made by Octavian Mihai
                </p>
              </div>
            </div>
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - Input and Controls */}
          <div className="space-y-6">
            <VectorInput onEntryAdded={handleUpdate} />
            <DataControls onUpdate={handleUpdate} />
            
            {/* Info Card */}
            <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
              <div className="flex items-start gap-3">
                <Zap className="h-5 w-5 text-primary mt-0.5" />
                <div className="space-y-1">
                  <p className="text-sm font-medium">How it works</p>
                  <p className="text-xs text-muted-foreground">
                    Text is converted to 384-dimensional vectors using a deterministic hash-based algorithm. 
                    Search uses cosine similarity to find the most similar entries.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Search and Results */}
          <div className="space-y-6 lg:col-span-2">
            <SearchBox onSearchResults={setSearchResults} />
            <ResultsTable 
              results={displayResults} 
              showAllEntries={showAllEntries}
              onUpdate={handleUpdate} 
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default VectorApp;
