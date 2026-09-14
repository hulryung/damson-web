import nextra from 'nextra'

const withNextra = nextra({
  defaultShowCopyCode: true,
  search: {
    codeblocks: false
  }
})

export default withNextra({
  reactStrictMode: true,
  i18n: { locales: ['en', 'ko'], defaultLocale: 'en' },
  async redirects() {
    return [
      { source: '/', destination: '/en', permanent: true },
      { source: '/manual/:path*', destination: '/ko/manual/:path*', permanent: true },
      ...['installation', 'getting-started', 'features', 'tabs-and-panes', 'preset-layouts', 'shell-integration', 'settings', 'glyph-width', 'cli', 'embedding', 'orchard'].map(path => ({
        source: `/${path}/:rest*`, destination: `/en/${path}/:rest*`, permanent: true
      }))
    ]
  },
  // Static-export friendly. Vercel serves this fine either way.
  images: {
    unoptimized: true
  }
})
