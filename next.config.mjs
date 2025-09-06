/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  distDir: "build",
  images: {
    unoptimized: true,
  },
  experimental: {
    optimizePackageImports: ["@heroui/react", "@tabler/icons-react"],
  },
};

export default nextConfig;
