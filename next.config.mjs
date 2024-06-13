/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "4vj0l2qypykbtzoo.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;
