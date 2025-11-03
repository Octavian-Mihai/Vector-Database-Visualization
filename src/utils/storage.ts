export interface VectorEntry {
  id: string;
  text: string;
  embedding: number[];
  timestamp: number;
}

const STORAGE_KEY = "vectordb_entries";

/**
 * Get all vector entries from session storage
 */
export function getEntries(): VectorEntry[] {
  try {
    const data = sessionStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error loading entries:", error);
    return [];
  }
}

/**
 * Save a new vector entry
 */
export function addEntry(entry: VectorEntry): void {
  const entries = getEntries();
  entries.push(entry);
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

/**
 * Delete an entry by ID
 */
export function deleteEntry(id: string): void {
  const entries = getEntries().filter(e => e.id !== id);
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

/**
 * Clear all entries
 */
export function clearAllEntries(): void {
  sessionStorage.removeItem(STORAGE_KEY);
}

/**
 * Export entries as JSON
 */
export function exportEntries(): string {
  const entries = getEntries();
  return JSON.stringify(entries, null, 2);
}

/**
 * Import entries from JSON
 */
export function importEntries(jsonData: string): void {
  try {
    const entries = JSON.parse(jsonData) as VectorEntry[];
    if (Array.isArray(entries)) {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    } else {
      throw new Error("Invalid data format");
    }
  } catch (error) {
    throw new Error("Failed to import data: Invalid JSON format");
  }
}

/**
 * Get entry count
 */
export function getEntryCount(): number {
  return getEntries().length;
}
