// from https://mdxjs.com/docs/getting-started/

import babel from "@babel/core";
import parser from "@babel/parser";
import { compileSync } from "@mdx-js/mdx";
import estreeToBabel from "estree-to-babel";
import remarkFrontmatter from "remark-frontmatter";
import remarkHeadingId from "remark-heading-id";
import remarkToc, { Options as RemarkTocOptions } from "remark-toc";

export function babelPluginSyntaxMdx(): babel.PluginItem {
  return { parserOverride: babelParserWithMdx };
}

function babelParserWithMdx(value: any, options: any) {
  if (options.sourceFileName && /\.mdx?$/.test(options.sourceFileName)) {
    return compileSync(
      { value, path: options.sourceFileName },
      {
        recmaPlugins: [recmaBabel],
        remarkPlugins: [
          remarkFrontmatter,
          remarkHeadingId,
          [remarkToc, <RemarkTocOptions>{ heading: "목차" }],
        ],
      }
    ).result;
  }

  return parser.parse(value, options);
}

function recmaBabel(this: { compiler: any }) {
  this.compiler = estreeToBabel;
}
