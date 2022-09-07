/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: [
            'avatars.githubusercontent.com',
            'avatars2.githubusercontent.com'
        ],
    },
}

module.exports = nextConfig
