/** @type {import('next').NextConfig} */
const nextConfig = {
  // The design page moved into the main page (Design section); old links still land there
  async redirects() {
    return [{ source: '/ux', destination: '/#design', permanent: true }]
  },
}

module.exports = nextConfig
