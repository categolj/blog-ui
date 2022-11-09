/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: [
            'avatars.githubusercontent.com',
            'avatars2.githubusercontent.com'
        ],
    },
    webpack: (config, {isServer}) => {
        if (!isServer) {
            config.resolve.fallback = {
                'node-fetch': false
            }
        }
        return config;
    }
}

module.exports = nextConfig
