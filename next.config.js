/** @type {import('next').NextConfig} */
module.exports = {
    reactStrictMode: true,
    async rewrites() {
        return [
            {
                source: "/cms",
                destination: "/cms/home",
            },
            {
                source: "/cms/salesman",
                destination: "/cms/salesman/overview",
            },
        ];
    },
};
