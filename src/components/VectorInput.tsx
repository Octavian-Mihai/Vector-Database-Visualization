import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Plus, Sparkles } from "lucide-react";
import { getEmbedding } from "@/utils/embeddings";
import { addEntry, type VectorEntry } from "@/utils/storage";
import { toast } from "sonner";

interface VectorInputProps {
  onEntryAdded: () => void;
}

export function VectorInput({ onEntryAdded }: VectorInputProps) {
  const [text, setText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleVectorize = () => {
    if (!text.trim()) {
      toast.error("Please enter some text to vectorize");
      return;
    }

    setIsProcessing(true);

    // Simulate processing time for better UX
    setTimeout(() => {
      const embedding = getEmbedding(text);
      const entry: VectorEntry = {
        id: crypto.randomUUID(),
        text: text.trim(),
        embedding,
        timestamp: Date.now(),
      };

      addEntry(entry);
      setText("");
      setIsProcessing(false);
      toast.success("Entry vectorized and added to database");
      onEntryAdded();
    }, 300);
  };

  return (
    <Card className="p-6 shadow-card">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">Add to Vector Database</h2>
        </div>
        
        <Textarea
          placeholder="Enter text to vectorize and store..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="min-h-[120px] resize-none"
          disabled={isProcessing}
        />

        <Button
          onClick={handleVectorize}
          disabled={isProcessing || !text.trim()}
          className="w-full"
        >
          <Plus className="mr-2 h-4 w-4" />
          {isProcessing ? "Vectorizing..." : "Vectorize & Add"}
        </Button>
      </div>
    </Card>
  );
}
