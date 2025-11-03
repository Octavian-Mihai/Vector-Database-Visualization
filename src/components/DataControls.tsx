import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, Upload, Trash2, Database } from "lucide-react";
import { clearAllEntries, exportEntries, importEntries, getEntryCount } from "@/utils/storage";
import { toast } from "sonner";

interface DataControlsProps {
  onUpdate: () => void;
}

export function DataControls({ onUpdate }: DataControlsProps) {
  const [entryCount, setEntryCount] = useState(getEntryCount());

  const handleClear = () => {
    if (entryCount === 0) {
      toast.error("No entries to clear");
      return;
    }

    if (confirm(`Are you sure you want to delete all ${entryCount} entries?`)) {
      clearAllEntries();
      setEntryCount(0);
      toast.success("All entries cleared");
      onUpdate();
    }
  };

  const handleExport = () => {
    if (entryCount === 0) {
      toast.error("No entries to export");
      return;
    }

    const data = exportEntries();
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `vectordb-export-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Data exported successfully");
  };

  const handleImport = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "application/json";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = e.target?.result as string;
          importEntries(data);
          setEntryCount(getEntryCount());
          toast.success("Data imported successfully");
          onUpdate();
        } catch (error) {
          toast.error(error instanceof Error ? error.message : "Failed to import data");
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  // Update count when entries change
  useState(() => {
    const interval = setInterval(() => {
      setEntryCount(getEntryCount());
    }, 1000);
    return () => clearInterval(interval);
  });

  return (
    <Card className="p-6 shadow-card">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Database className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">Database Controls</h2>
        </div>

        <div className="rounded-lg bg-muted/50 p-4">
          <p className="text-sm text-muted-foreground">Total Entries</p>
          <p className="text-3xl font-bold">{entryCount}</p>
        </div>

        <div className="grid gap-2">
          <Button onClick={handleExport} variant="outline" className="w-full">
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>

          <Button onClick={handleImport} variant="outline" className="w-full">
            <Upload className="mr-2 h-4 w-4" />
            Import Data
          </Button>

          <Button onClick={handleClear} variant="destructive" className="w-full">
            <Trash2 className="mr-2 h-4 w-4" />
            Clear All
          </Button>
        </div>

        <p className="text-xs text-muted-foreground">
          All data is stored in your browser's session storage and will be cleared when you close this tab.
        </p>
      </div>
    </Card>
  );
}
