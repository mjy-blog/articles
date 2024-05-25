import { join, resolve } from "node:path";

import frontmatter from "front-matter";

import { writeFile } from "node:fs/promises";
import { compile } from "./compile";
import { listArticles } from "./listArticles";

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
    const { attributes } = frontmatter(content);
    articles.push({
      path: join("(articles)", path.replace(/[\\/]README\.mdx$/, "/page.js")),
      attributes,
      slug: path.replace(/[\\/]README\.mdx$/, ""),
    });
  }
  console.log("done.");
  await writeFile("out/index.json", JSON.stringify(articles));
})();
