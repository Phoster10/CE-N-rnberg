import Image, { type ImageProps } from "next/image";

// Must match images.remotePatterns in next.config.ts.
const OPTIMIZABLE = /^https:\/\/([a-z0-9-]+\.supabase\.co|images\.unsplash\.com|i\.ytimg\.com)\//i;

/**
 * next/image for photos whose URL comes from the database: resized and
 * re-encoded per screen size. A URL from any other host is shown as-is
 * instead of throwing.
 */
export default function Photo({ src, alt, ...props }: Omit<ImageProps, "src"> & { src: string }) {
  return <Image src={src} alt={alt} unoptimized={!OPTIMIZABLE.test(src)} {...props} />;
}
