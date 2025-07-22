import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'product-catalog-backend-ssr2.onrender.com',
				pathname: '/**',
			},
		],
	},
};

export default nextConfig;
