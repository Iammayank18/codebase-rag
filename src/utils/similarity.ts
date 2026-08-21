export function cosinSimilarity(a: number[], b: number[]) {
  let dot = 0,
    sizeA = 0,
    sizeB = 0;

  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    sizeA += a[i] * a[i];
    sizeB += b[i] * b[i];
  }

  let magnitude = Math.sqrt(sizeA) * Math.sqrt(sizeB);
  return dot / magnitude;
}
