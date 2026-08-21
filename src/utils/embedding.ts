import { loadJson, saveJson } from "./fileUtils.ts";
import { createHash } from "crypto";
import { OpenRouter } from "@openrouter/sdk";
import { configDotenv } from "dotenv";

configDotenv();

const openRouter = new OpenRouter({
  //   httpReferer: "<value>",
  appTitle: "Testing",
  //   appCategories: "<value>",
  apiKey: process.env["OPEN_ROUTER_API_KEY"] ?? "",
});

let cache = loadJson("src/data/embedding.json");

const hash = (text: string) => createHash("sha1").update(text).digest("hex");

export async function embedAll(text: string[]) {
  let missing = text.filter((txt) => !cache[hash(txt)]);

  for (let index = 0; index < missing.length; index += 128) {
    let batch = missing.slice(index, index + 128);

    let vectorRes = await openRouter.embeddings.generate({
      requestBody: {
        input: batch,
        model: "openai/text-embedding-3-small",
      },
    });

    batch.forEach((t, j) => {
      //@ts-ignore
      return (cache[hash(t)] = vectorRes.data[j].embedding);
    });
  }

  saveJson("src/data/embedding.json", cache);
  return text.map((item) => cache[hash(item)]);
}
