import { listFiles, loadJson, readFile, saveJson } from "./utils/fileUtils.ts";
import path from "path";
import { naiveChunk } from "./utils/methodUtils.ts";
import { embedAll } from "./utils/embedding.ts";

let files = await listFiles("example/mini-school");

let chunks = files.flatMap((item) => {
  return naiveChunk(readFile(path.join("example/mini-school/" + item)), item);
});

let vector = await embedAll(chunks.map((chunk) => chunk.text));

let vectorChunk = chunks.map((item, i) => ({ ...item, vector: vector[i] }));

saveJson("src/data/index.json", vectorChunk);
