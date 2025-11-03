/**
 * Calculate cosine similarity between two vectors
 * Returns a value between -1 and 1 (higher = more similar)
 */
export function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length) {
    throw new Error("Vectors must have the same length");
  }
  
  const dotProduct = a.reduce((sum, val, i) => sum + val * b[i], 0);
  const magnitudeA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
  const magnitudeB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
  
  if (magnitudeA === 0 || magnitudeB === 0) {
    return 0;
  }
  
  return dotProduct / (magnitudeA * magnitudeB);
}

/**
 * Format similarity score as percentage
 */
export function formatSimilarity(score: number): string {
  return `${(score * 100).toFixed(1)}%`;
}

/**
 * Get color class based on similarity score
 */
export function getSimilarityColor(score: number): string {
  if (score >= 0.8) return "text-accent";
  if (score >= 0.6) return "text-primary";
  if (score >= 0.4) return "text-muted-foreground";
  return "text-destructive";
}
