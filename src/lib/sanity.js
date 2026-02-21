import { createClient } from '@sanity/client';
import createImageUrlBuilder from '@sanity/image-url';

const projectId = import.meta.env.VITE_PUBLIC_SANITY_PROJECT_ID;
const dataset = import.meta.env.VITE_PUBLIC_SANITY_DATASET;
const apiVersion = import.meta.env.VITE_PUBLIC_SANITY_API_VERSION || '2024-03-01';

export const client = createClient({
  projectId,
  dataset,
  useCdn: true,
  apiVersion,
});

const builder = createImageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}
