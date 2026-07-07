import type { NextConfig } from "next";

const SECURITY_HEADERS = [
  // Prevent MIME-type sniffing
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Refuse to be embedded in an iframe
  { key: "X-Frame-Options", value: "DENY" },
  // Enable XSS protection in legacy browsers
  { key: "X-XSS-Protection", value: "1; mode=block" },
  // Only send full referrer on same-origin; stripped cross-origin
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Disable unnecessary browser features
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  // Allow prefetching for performance
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

const nextConfig: NextConfig = {
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  // typedRoutes graduated from experimental in Next.js 15.5
  typedRoutes: true,
  // Silence the multi-lockfile workspace root warning
  outputFileTracingRoot: process.cwd(),

  async headers() {
    return [{ source: "/(.*)", headers: SECURITY_HEADERS }];
  },

  images: {
    formats: ["image/avif", "image/webp"],
  },

  experimental: {
    // Tree-shake large libraries that re-export many named members
    optimizePackageImports: ["lucide-react", "@react-three/drei", "motion"],
  },
};

export default nextConfig;
