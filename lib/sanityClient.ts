// lib/sanityClient.js
import { createClient } from 'next-sanity';

export const sanityClient = createClient({
  projectId: 'your-project-id',  // Replace with your Sanity project ID
  dataset: 'production',         // Replace with your dataset
  apiVersion: '2023-01-01',      // Use current date for latest features
  useCdn: true,                  // Use CDN for faster response
});
