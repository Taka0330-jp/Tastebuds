import type { NextConfig } from "next";

/**
 * Next.js Image Optimization requires explicit permission
 * for loading images from external domains.
 *
 * We allow images hosted on Supabase Storage (public bucket),
 * which are served from:
 * https://<project-id>.supabase.co/storage/v1/object/public/...
 *
 * This configuration is required when using <Image /> from "next/image".
 */

const supabaseHost = (() => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!url) return undefined;
  try {
    return new URL(url).hostname;
  } catch {
    return undefined;
  }
})();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: supabaseHost
      ? [
        {
          protocol: "https",
          hostname: supabaseHost,
          pathname: "/storage/v1/object/public/**",
        },
      ]
      : [],
  },
};

export default nextConfig;
