/**
 * Analytics adapters — load only after consent / idle.
 * Wired in Phase 2+; stubs keep architecture ready without hurting CWV.
 */

export type AnalyticsProvider =
  | 'ga4'
  | 'gtm'
  | 'posthog'
  | 'clarity'
  | 'metaPixel';

export const analyticsConfig = {
  ga4Id: process.env.NEXT_PUBLIC_GA4_ID ?? '',
  gtmId: process.env.NEXT_PUBLIC_GTM_ID ?? '',
  posthogKey: process.env.NEXT_PUBLIC_POSTHOG_KEY ?? '',
  posthogHost: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? '',
  clarityId: process.env.NEXT_PUBLIC_CLARITY_ID ?? '',
  metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID ?? '',
} as const;

export function getEnabledProviders(): AnalyticsProvider[] {
  const enabled: AnalyticsProvider[] = [];
  if (analyticsConfig.ga4Id) enabled.push('ga4');
  if (analyticsConfig.gtmId) enabled.push('gtm');
  if (analyticsConfig.posthogKey) enabled.push('posthog');
  if (analyticsConfig.clarityId) enabled.push('clarity');
  if (analyticsConfig.metaPixelId) enabled.push('metaPixel');
  return enabled;
}
