export function naiveChunk(text: string, file: string) {
  const SIZE = 400;
  const OVERLAP = 60;
  let chunks = [];
  for (let index = 0; index < text.length; index += SIZE - OVERLAP) {
    const slice = text.slice(index, index + SIZE);
    chunks.push({
      id: file + ":" + index,
      text: slice,
      file,
      startLine: lineAt(text, index),
      endLine: lineAt(text, index + slice.length),
    });
  }

  return chunks;
}

function lineAt(text: string, i: number) {
  return text.slice(0, i).split("\n").length;
}
