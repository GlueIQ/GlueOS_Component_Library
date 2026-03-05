/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@repo/ui"],
  // Include templates in the build output for Vercel deployments
  outputFileTracingIncludes: {
    '/api/generate': ['../../templates/**/*'],
  },
  // Ensure standalone mode is enabled for optimal deployments
  output: 'standalone',
};

export default nextConfig;
