/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		// domains: [
		// 	`avatars.githubusercontent.com`,
		// 	`lh3.googleusercontent.com`,
		// ],
		remotePatterns: [
			{
				protocol: "https",
				hostname: "avatars.githubusercontent.com",
			},
			{
				protocol: "https",
				hostname: "lh3.googleusercontent.com",
			},
		],
	},
};

module.exports = nextConfig;
