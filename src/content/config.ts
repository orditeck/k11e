import { defineCollection, z } from "astro:content";

const experiences = defineCollection({
  schema: ({ image }) =>
    z.object({
      sortOrder: z.number(),
      title: z.string(),
      company: z.string(),
      duration: z.string(),
      icon: image(),
      strong: z.boolean().optional(),
    }),
});

const services = defineCollection({
  schema: ({ image }) =>
    z.object({
      marketingTitle: z.string(),
      marketingBody: z.string(),
      marketingImage: image(),
      title: z.string(),
      subtitle: z.string(),
      toc: z.boolean().default(true),
    }),
});

export const collections = {
  experiences,
  services,
};
