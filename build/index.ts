import { spawn } from "node:child_process";
import { join, resolve } from "node:path";
import { stderr } from "node:process";

import frontmatter from "front-matter";

import { writeFile } from "node:fs/promises";
import { compile } from "./compile";
import { listArticles } from "./listArticles";

async function getCreateTime(path: string): Promise<string> {
  const gitlog = spawn("git", [
    "log",
    "--follow",
    "--format=%ad",
    "--date=iso-strict",
    path,
  ]);
  const tail1 = spawn("tail", ["-1"], {
    stdio: [gitlog.stdout, "pipe", stderr],
  });

  let result = "";
  tail1.stdout.on("data", (d) => {
    result += d.toString();
  });

  await new Promise<void>((resolve, reject) => {
    gitlog.on("exit", (code, signal) => {
      if (code || signal)
        reject(new Error(`Error, code: ${code}, signal: ${signal}`));
      resolve();
    });
  });
  await new Promise<void>((resolve, reject) => {
    tail1.on("exit", (code, signal) => {
      if (code || signal)
        reject(new Error(`Error, code: ${code}, signal: ${signal}`));
      resolve();
    });
  });

  result = result.trim();
  return result;
}

async function getUpdateTime(path: string): Promise<string> {
  const gitlog = spawn("git", [
    "log",
    "-1",
    "--format=%ci",
    "--date=iso-strict",
    path,
  ]);

  let result = "";
  gitlog.stdout.on("data", (d) => {
    result += d.toString();
  });

  await new Promise<void>((resolve, reject) => {
    gitlog.on("exit", (code, signal) => {
      if (code || signal)
        reject(new Error(`Error, code: ${code}, signal: ${signal}`));
      resolve();
    });
  });

  result = result.trim();
  return result || new Date().toISOString();
}

interface Article {
  attributes: any;
  path: string;
  slug: string;
}

(async () => {
  const articlePaths = await listArticles(resolve("src/(articles)"));
  const articles: Article[] = [];
  for (let i = 0; i < articlePaths.length; i++) {
    const path = articlePaths[i];
    console.log(`(${i + 1}/${articlePaths.length}) compiling ${path}`);
    const inPath = join("src/(articles)", path);
    const outPath = join(
      "out/(articles)",
      path.replace(/[\\/]README\.mdx$/, "/page.js")
    );
    const { content } = await compile(inPath, outPath);
    const { attributes } = frontmatter<any>(content);
    attributes.createTime ??= await getCreateTime(inPath);
    attributes.updateTime ??= await getUpdateTime(inPath);
    articles.push({
      path: join("(articles)", path.replace(/[\\/]README\.mdx$/, "/page.js")),
      attributes,
      slug: path.replace(/[\\/]README\.mdx$/, ""),
    });
  }
  console.log("done.");
  await writeFile("out/index.json", JSON.stringify(articles));
})();
