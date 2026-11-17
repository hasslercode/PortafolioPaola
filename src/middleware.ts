import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { BLOG_REDIRECTS, blogRedirectPath } from './content/blog-catalog';

const handleI18n = createMiddleware(routing);

/**
 * Archived guides redirect here, not in next.config.
 * A few hundred config redirects are published as deployment routes and
 * Vercel rejects the preview once that table grows. One middleware response
 * is still a single 308.
 */
function archivedBlogRedirect(request: NextRequest): NextResponse | null {
  const match = request.nextUrl.pathname.match(/^\/(?:(es|en)\/)?blog\/([^/]+)\/?$/);
  if (!match) return null;

  const prefix = match[1];
  const slug = match[2];
  const target = BLOG_REDIRECTS[slug];
  const url = request.nextUrl.clone();

  if (target) {
    url.pathname = blogRedirectPath(prefix === 'en' ? 'en' : 'es', target);
    return NextResponse.redirect(url, 308);
  }

  // The old `/blog/:slug` config redirect ran before middleware and added a hop.
  // Kept guides (and unknown slugs) still land on the Spanish URL in one 308.
  if (!prefix) {
    url.pathname = `/es/blog/${slug}`;
    return NextResponse.redirect(url, 308);
  }

  return null;
}

export default function middleware(request: NextRequest) {
  return archivedBlogRedirect(request) ?? handleI18n(request);
}

export const config = {
  // Match all pathnames except Next internals and static files
  matcher: ['/', '/(es|en)/:path*', '/((?!_next|_vercel|.*\\..*).*)'],
};
