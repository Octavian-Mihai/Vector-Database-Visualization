import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, Database } from "lucide-react";
import { formatSimilarity, getSimilarityColor } from "@/utils/similarity";
import { deleteEntry } from "@/utils/storage";
import { toast } from "sonner";
import type { SearchResult } from "./SearchBox";

interface ResultsTableProps {
  results: SearchResult[];
  showAllEntries?: boolean;
  onUpdate: () => void;
}

export function ResultsTable({ results, showAllEntries = false, onUpdate }: ResultsTableProps) {
  const handleDelete = (id: string, text: string) => {
    deleteEntry(id);
    toast.success("Entry deleted");
    onUpdate();
  };

  if (results.length === 0) {
    return (
      <Card className="p-12 text-center shadow-card">
        <Database className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
        <p className="mt-4 text-muted-foreground">
          {showAllEntries ? "No entries in database yet" : "No search results"}
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          {showAllEntries ? "Add some text to get started" : "Enter a search query above"}
        </p>
      </Card>
    );
  }

  return (
    <Card className="shadow-card">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">
            {showAllEntries ? "All Entries" : "Search Results"}
          </h3>
          <Badge variant="secondary">{results.length} entries</Badge>
        </div>

        <div className="space-y-3">
          {results.map((result) => (
            <div
              key={result.id}
              className="group flex items-start gap-4 rounded-lg border p-4 transition-all hover:border-primary/50 hover:bg-accent/5"
            >
              <div className="flex-1 space-y-2">
                <p className="text-sm leading-relaxed">{result.text}</p>
                
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  {!showAllEntries && result.similarity !== undefined && (
                    <span className={`font-mono font-medium ${getSimilarityColor(result.similarity)}`}>
                      Similarity: {formatSimilarity(result.similarity)}
                    </span>
                  )}
                  <span>
                    {new Date(result.timestamp).toLocaleString()}
                  </span>
                  <span className="font-mono">
                    ID: {result.id.slice(0, 8)}
                  </span>
                </div>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDelete(result.id, result.text)}
                className="opacity-0 transition-opacity group-hover:opacity-100"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
