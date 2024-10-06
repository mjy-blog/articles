'use server';

import { notFound } from 'next/navigation';
import { ComponentType } from 'react';

import { ClientComponent } from './ClientComponent';

interface Params {
  params: Record<'slug', string>;
}

export default async function Post({ params }: Params) {
  const MDXContent = await (async () => {
    let result: ComponentType;
    try {
      result = await import('./data/' + params.slug + '.js');
    } catch {
      throw notFound();
    }
    return result;
  })();

  return <ClientComponent MDXContent={MDXContent} />;
}
