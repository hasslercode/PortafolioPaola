import { z } from 'zod';

/** Shared frontmatter schemas — CMS-ready content contracts. */

export const localeSlugSchema = z.object({
  es: z.string().min(1),
  en: z.string().min(1),
});

export const seoFrontmatterSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1).max(400),
  keywords: z.array(z.string()).default([]),
  ogImage: z.string().optional(),
  noIndex: z.boolean().default(false),
});

export const serviceFrontmatterSchema = z.object({
  type: z.literal('service'),
  slug: localeSlugSchema,
  title: z.string(),
  shortAnswer: z.string().max(400),
  summary: z.string(),
  order: z.number().int().positive(),
  draft: z.boolean().default(false),
  seo: seoFrontmatterSchema,
  faq: z
    .array(
      z.object({
        question: z.string(),
        answer: z.string(),
      }),
    )
    .default([]),
});

export const caseStudyFrontmatterSchema = z.object({
  type: z.literal('case-study'),
  slug: localeSlugSchema,
  title: z.string(),
  brand: z.string(),
  shortAnswer: z.string().max(400),
  problem: z.string(),
  context: z.string(),
  objective: z.string(),
  process: z.array(z.string()).default([]),
  results: z.array(z.string()).default([]),
  metrics: z
    .array(
      z.object({
        label: z.string(),
        value: z.string(),
      }),
    )
    .default([]),
  draft: z.boolean().default(false),
  videoUrl: z.string().url().optional(),
  videoTitle: z.string().optional(),
  seo: seoFrontmatterSchema,
  faq: z
    .array(
      z.object({
        question: z.string(),
        answer: z.string(),
      }),
    )
    .default([]),
});

export const blogFrontmatterSchema = z.object({
  type: z.literal('blog'),
  slug: localeSlugSchema,
  title: z.string(),
  shortAnswer: z.string().max(400),
  publishedAt: z.string(),
  updatedAt: z.string().optional(),
  /** Commercial topic clusters — aligned to Top-10 Colombia strategy */
  topic: z
    .enum([
      'seo',
      'instagram',
      'tiktok',
      'branding',
      'marketing',
      'video',
      'ugc',
      'strategy',
      'local',
      'comparison',
    ])
    .default('marketing'),
  intent: z.enum(['commercial', 'decision', 'comparison']),
  primaryKeyword: z.string().optional(),
  cluster: z
    .enum([
      'strategy',
      'production',
      'ugc',
      'entrepreneurs',
      'local',
      'comparison',
    ])
    .optional(),
  relatedSlugs: z.array(z.string()).default([]),
  serviceCta: z.string().optional(),
  draft: z.boolean().default(false),
  seo: seoFrontmatterSchema,
  faq: z
    .array(
      z.object({
        question: z.string(),
        answer: z.string(),
      }),
    )
    .default([]),
});

export type ServiceFrontmatter = z.infer<typeof serviceFrontmatterSchema>;
export type CaseStudyFrontmatter = z.infer<typeof caseStudyFrontmatterSchema>;
export type BlogFrontmatter = z.infer<typeof blogFrontmatterSchema>;
