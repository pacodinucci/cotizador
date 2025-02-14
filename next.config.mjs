/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    esmExternals: "loose",
  },
  api: {
    bodyParser: {
      sizeLimit: "50mb", // Ajusta este valor según sea necesario
    },
  },
};

export default nextConfig;
