/**
 * Stub for `astro:content` virtual module — used by vitest only.
 * Pure-function tests don't call getCollection, but the import must resolve.
 */
export type CollectionEntry<T extends string> = {
  id: string;
  slug: string;
  collection: T;
  data: Record<string, unknown>;
  body: string;
  render: () => Promise<unknown>;
};

export async function getCollection(): Promise<never[]> {
  throw new Error('getCollection is not available in vitest — use a mock');
}

export function defineCollection(config: unknown) {
  return config;
}

export { z } from 'astro/zod';
