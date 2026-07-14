import Image, { type ImageProps } from 'next/image';
import { cn } from '@/lib/utils';

type OptimizedImageProps = Omit<ImageProps, 'alt'> & {
  alt: string;
};

/**
 * Thin next/image wrapper for CWV (LCP/CLS).
 * Prefer this for photo LCP/below-fold portraits; leave decorative SVGs as <img>.
 * @see https://nextjs.org/docs/app/building-your-application/optimizing/images
 */
export function OptimizedImage({ className, alt, ...props }: OptimizedImageProps) {
  return <Image alt={alt} className={cn(className)} {...props} />;
}
