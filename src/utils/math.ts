import type { MatchCalculation } from "../types";

/**
 * Calculates the cosine similarity between two vectors.
 * Returns the dot product, magnitudes, raw similarity score, and percentage.
 */
export function calculateCosineSimilarity(
  vectorA: number[],
  vectorB: number[]
): MatchCalculation {
  if (
    vectorA.length === 0 ||
    vectorB.length === 0 ||
    vectorA.length !== vectorB.length
  ) {
    return {
      dotProduct: 0,
      magnitudeA: 0,
      magnitudeB: 0,
      cosineScore: 0,
      percentage: 0,
    };
  }

  let dotProduct = 0;
  let sumSqA = 0;
  let sumSqB = 0;

  for (let i = 0; i < vectorA.length; i++) {
    dotProduct += vectorA[i] * vectorB[i];
    sumSqA += vectorA[i] * vectorA[i];
    sumSqB += vectorB[i] * vectorB[i];
  }

  const magnitudeA = Math.sqrt(sumSqA);
  const magnitudeB = Math.sqrt(sumSqB);

  if (magnitudeA === 0 || magnitudeB === 0) {
    return {
      dotProduct,
      magnitudeA,
      magnitudeB,
      cosineScore: 0,
      percentage: 0,
    };
  }

  const cosineScore = dotProduct / (magnitudeA * magnitudeB);
  
  // Convert similarity score to percentage (e.g. 0.985 -> 98.5%)
  const percentage = Math.round(cosineScore * 1000) / 10;

  return {
    dotProduct: Math.round(dotProduct * 100) / 100,
    magnitudeA: Math.round(magnitudeA * 1000) / 1000,
    magnitudeB: Math.round(magnitudeB * 1000) / 1000,
    cosineScore: Math.round(cosineScore * 10000) / 10000,
    percentage,
  };
}
