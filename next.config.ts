import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    domains: ['res.cloudinary.com'], // ✅ Permite imágenes externas desde Cloudinary
  },
}

export default nextConfig
