import { mkdir, readFile, writeFile } from 'node:fs/promises';

import babel from '@babel/core';

import { dirname } from 'node:path';
import { babelPluginSyntaxMdx } from './plugin';

const original = `export default function MDXContent(props = {}) {
  const {
    wrapper: MDXLayout
  } = props.components || {};
  return MDXLayout ? _jsx(MDXLayout, {
    ...props,
    children: _jsx(_createMdxContent, {
      ...props
    })
  }) : _createMdxContent(props);
}`;

const replacement = `export { _createMdxContent as default };`;

export interface CompileResult {
  content: string;
  replacedCode: string;
}

export async function compile(
  inFilePath: string,
  outFilePath: string,
): Promise<CompileResult> {
  const content = (await readFile(inFilePath)).toString();
  const result = await babel.transformAsync(content, {
    filename: inFilePath,
    plugins: [babelPluginSyntaxMdx],
  });
  const code = result!.code!;

  if (!code.endsWith(original)) {
    throw new Error('Dependencies updated, build script must be updated.');
  }
  const replacedCode =
    code.substring(0, code.length - original.length) + replacement;

  await mkdir(dirname(outFilePath), { recursive: true });
  await writeFile(outFilePath, replacedCode);

  return { content, replacedCode };
}
