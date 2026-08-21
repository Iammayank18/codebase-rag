import { embedAll } from "./utils/embedding.ts";
import { loadJson } from "./utils/fileUtils.ts";
import { cosinSimilarity } from "./utils/similarity.ts";

const question = process.argv[2];

if (!question) {
  console.error('usage: npm run ask "your question"');
  process.exit(1);
}

const index = loadJson("src/data/index.json");
if (!index.length) {
  console.error("index is empty - please run yarn index first");
  process.exit(1);
}

const [qvec] = await embedAll([question]);

const top = index
  .map((item: any) => ({
    ...item,
    score: cosinSimilarity(qvec, item.vector),
  }))
  .sort((a: any, b: any) => b.score - a.score)
  .slice(0, 5);

for (const item of top) {
  console.log(
    item.score.toFixed(3),
    item.file + ":" + item.startLine + "-" + item.endLine,
  );
}
