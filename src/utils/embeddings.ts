/**
 * Generate a deterministic embedding vector from text
 * Uses a hash-based approach for consistent, reproducible vectors
 */
export function getEmbedding(text: string): number[] {
  const EMBEDDING_DIM = 384;
  const vector = new Array(EMBEDDING_DIM).fill(0);
  
  // Normalize text
  const normalized = text.toLowerCase().trim();
  const words = normalized.split(/\s+/);
  
  // Generate vector using multiple hash functions for better distribution
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    
    // Hash 1: Character code sum with sine/cosine
    let hash1 = 0;
    for (let j = 0; j < word.length; j++) {
      hash1 += word.charCodeAt(j) * (j + 1);
    }
    
    // Hash 2: Rolling hash
    let hash2 = 5381;
    for (let j = 0; j < word.length; j++) {
      hash2 = ((hash2 << 5) + hash2) + word.charCodeAt(j);
    }
    
    // Distribute across dimensions
    for (let dim = 0; dim < EMBEDDING_DIM; dim++) {
      const seed = (hash1 * (dim + 1) + hash2) % 1000;
      vector[dim] += Math.sin(seed) * 0.5 + Math.cos(seed * 1.3) * 0.5;
    }
  }
  
  // Add text length influence
  const lengthFactor = Math.log(normalized.length + 1);
  for (let i = 0; i < EMBEDDING_DIM; i++) {
    vector[i] += Math.sin(i * lengthFactor) * 0.3;
  }
  
  // Normalize vector to unit length
  const magnitude = Math.sqrt(vector.reduce((sum, val) => sum + val * val, 0));
  return vector.map(val => val / magnitude);
}

/**
 * Get a short preview of the embedding (first 8 dimensions)
 */
export function getEmbeddingPreview(embedding: number[]): string {
  return embedding
    .slice(0, 8)
    .map(v => v.toFixed(3))
    .join(", ") + "...";
}
