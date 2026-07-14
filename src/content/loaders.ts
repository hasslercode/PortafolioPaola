import 'server-only';

import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';
import {
  serviceFrontmatterSchema,
  caseStudyFrontmatterSchema,
  blogFrontmatterSchema,
  type ServiceFrontmatter,
  type CaseStudyFrontmatter,
  type BlogFrontmatter,
} from './schemas';
import {
  serviceSlugs,
  caseStudySlugs,
  blogSlugs,
  type ServiceSlug,
  type CaseStudySlug,
  type BlogSlug,
} from './registry';

const ROOT = path.join(process.cwd(), 'content');

export type ServiceDoc = ServiceFrontmatter & {
  canonicalSlug: ServiceSlug;
  locale: string;
  body: string;
};

export type CaseStudyDoc = CaseStudyFrontmatter & {
  canonicalSlug: CaseStudySlug;
  locale: string;
  body: string;
};

export type BlogDoc = BlogFrontmatter & {
  canonicalSlug: BlogSlug;
  locale: string;
  body: string;
};

async function readMdx(filePath: string) {
  try {
    const raw = await fs.readFile(filePath, 'utf8');
    return matter(raw);
  } catch {
    return null;
  }
}

function localizePath(collection: string, slug: string, locale: string) {
  return path.join(ROOT, collection, locale, `${slug}.mdx`);
}

export async function getAllServiceSlugs() {
  return [...serviceSlugs];
}

export async function getAllCaseStudySlugs() {
  return [...caseStudySlugs];
}

export async function getAllBlogSlugs() {
  return [...blogSlugs];
}

export async function getServiceBySlug(
  slug: string,
  locale: string,
): Promise<ServiceDoc | null> {
  if (!serviceSlugs.includes(slug as ServiceSlug)) return null;

  const file = await readMdx(localizePath('services', slug, locale));
  if (!file) return null;

  const parsed = serviceFrontmatterSchema.safeParse({
    ...file.data,
    type: 'service',
  });
  if (!parsed.success) {
    console.error(parsed.error.flatten());
    return null;
  }

  return {
    ...parsed.data,
    canonicalSlug: slug as ServiceSlug,
    locale,
    body: file.content.trim(),
  };
}

export async function getCaseStudyBySlug(
  slug: string,
  locale: string,
): Promise<CaseStudyDoc | null> {
  if (!caseStudySlugs.includes(slug as CaseStudySlug)) return null;

  const file = await readMdx(localizePath('case-studies', slug, locale));
  if (!file) return null;

  const parsed = caseStudyFrontmatterSchema.safeParse({
    ...file.data,
    type: 'case-study',
  });
  if (!parsed.success) {
    console.error(parsed.error.flatten());
    return null;
  }

  return {
    ...parsed.data,
    canonicalSlug: slug as CaseStudySlug,
    locale,
    body: file.content.trim(),
  };
}

export async function getBlogBySlug(
  slug: string,
  locale: string,
): Promise<BlogDoc | null> {
  if (!blogSlugs.includes(slug as BlogSlug)) return null;

  const file = await readMdx(localizePath('blog', slug, locale));
  if (!file) return null;

  const parsed = blogFrontmatterSchema.safeParse({
    ...file.data,
    type: 'blog',
  });
  if (!parsed.success) {
    console.error(parsed.error.flatten());
    return null;
  }

  return {
    ...parsed.data,
    canonicalSlug: slug as BlogSlug,
    locale,
    body: file.content.trim(),
  };
}

export async function getAllServices(locale: string) {
  const docs = await Promise.all(
    serviceSlugs.map((slug) => getServiceBySlug(slug, locale)),
  );
  return docs
    .filter((doc): doc is ServiceDoc => Boolean(doc) && !doc!.draft)
    .sort((a, b) => a.order - b.order);
}

export async function getAllCaseStudies(locale: string) {
  const docs = await Promise.all(
    caseStudySlugs.map((slug) => getCaseStudyBySlug(slug, locale)),
  );
  return docs.filter((doc): doc is CaseStudyDoc => Boolean(doc) && !doc!.draft);
}

export async function getAllPosts(locale: string) {
  const docs = await Promise.all(
    blogSlugs.map((slug) => getBlogBySlug(slug, locale)),
  );
  return docs
    .filter((doc): doc is BlogDoc => Boolean(doc) && !doc!.draft)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}
