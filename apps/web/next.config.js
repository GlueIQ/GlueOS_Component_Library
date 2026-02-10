import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nextConfig = {
  /** @type {import('next').NextConfig} */
  transpilePackages: ["@repo/ui"],
  experimental: {
    turbopack: {
      root: path.resolve(__dirname, '../../'),
    },
  },
};

export default nextConfig;
