const nextMDX = require('@next/mdx')


const withMDX = nextMDX({
    // By default only the .mdx extension is supported.
    extension: /\.mdx?$/,
    options: {providerImportSource: '@mdx-js/react',  /* otherOptions… */}
})

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    basePath: '/demo/out',
}

module.exports = withMDX({
    ...nextConfig,
    // Support MDX files as pages:
    pageExtensions: ['md', 'mdx', 'tsx', 'ts', 'jsx', 'js'],
})
