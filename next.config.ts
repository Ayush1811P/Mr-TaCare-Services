import type { NextConfig } from 'next';

/**
 * Security headers.
 *
 * The CSP is intentionally strict but compatible with how the app is built:
 * no external scripts, no inline event handlers, no third-party frames.
 *
 * 'unsafe-inline' for styles is required by Next.js's injected critical CSS;
 * scripts avoid it in production by using nonce-free static chunks. In dev,
 * Turbopack needs 'unsafe-eval', so the stricter policy applies to production
 * builds only.
 */
const isDev = process.env.NODE_ENV === 'development';

const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  // wa.me handoff is a top-level navigation, so it needs form-action/navigate.
  "connect-src 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  'upgrade-insecure-requests',
].join('; ');

const securityHeaders = [
  { key: 'Content-Security-Policy', value: contentSecurityPolicy },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  // No feature of this site needs these; geolocation is same-origin only.
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), payment=(), geolocation=(self)' },
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  images: {
    // Local assets only today; add remotePatterns when provider images move to
    // Supabase Storage or a CDN.
    formats: ['image/avif', 'image/webp'],
    // Next 16 requires explicitly allowing any non-default quality value.
    qualities: [70, 75],
    deviceSizes: [360, 420, 640, 768, 1024, 1280, 1536],
    imageSizes: [80, 96, 128, 170, 220, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.gstatic.com',
      },
      {
        protocol: 'https',
        hostname: '**.serpapi.com',
      },
      {
        protocol: 'https',
        hostname: '**.googleusercontent.com',
      }
    ],
  },

  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }];
  },
};

export default nextConfig;
