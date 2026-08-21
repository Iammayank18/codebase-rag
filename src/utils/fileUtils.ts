import fg from "fast-glob";
import fs from "fs";
import path from "path";

export async function listFiles(path: string) {
  const files = await fg(["**/*.{ts,tsx,js,jsx}"], {
    cwd: path,
    ignore: [
      "**/node_modules/**", // other people's code, huge
      "**/dist/**", // build output, a copy of your code
      "**/build/**",
      "**/.next/**",
      "**/*.min.js", // minified, unreadable
      "**/__snapshots__/**",
      "**/coverage/**",
    ],
  });
  return files;
}

export function readFile(path: string) {
  let file = fs.readFileSync(path, "utf8");
  return file;
}

export function loadJson(file: string) {
  if (!fs.existsSync(file)) return {}; // pehli baar file hai hi nahi
  const raw = fs.readFileSync(file, "utf8");
  if (!raw.trim()) return {}; // khaali file
  return JSON.parse(raw); // ← asli kaam
}

export function saveJson(file: string, data: unknown) {
  fs.mkdirSync(path.dirname(file), { recursive: true }); // folder bana do
  fs.writeFileSync(file, JSON.stringify(data, null, 2), "utf8");
}
