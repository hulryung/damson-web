import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import Image from 'next/image'
import 'nextra-theme-docs/style.css'
import './globals.css'

export const metadata = {
  metadataBase: new URL('https://damson.app'),
  title: {
    default: 'Damson — The terminal built only for macOS',
    template: '%s — Damson'
  },
  description:
    'Damson is a GPU-accelerated terminal written in Swift, built exclusively for macOS. Safari-smooth scrolling, flawless Korean input, and a native Mac feel — a well-made Mac app that happens to be a terminal.',
  applicationName: 'Damson',
  appleWebApp: { title: 'Damson' },
  openGraph: {
    type: 'website',
    siteName: 'Damson',
    url: 'https://damson.app',
    title: 'Damson — The terminal built only for macOS',
    description:
      'A GPU-accelerated terminal written in Swift, built exclusively for macOS. No cross-platform compromises.',
    images: ['/og.png']
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Damson — The terminal built only for macOS',
    description:
      'A GPU-accelerated terminal written in Swift, built exclusively for macOS.',
    images: ['/og.png']
  }
}

const logo = (
  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
    <Image src="/logo.png" alt="" width={26} height={26} priority />
    <b style={{ fontSize: '1.05rem' }}>Damson</b>
  </span>
)

const navbar = (
  <Navbar
    logo={logo}
    projectLink="https://github.com/hulryung/damson"
  >
    <a
      href="https://github.com/hulryung/damson/releases/latest/download/Damson.dmg"
      style={{
        fontWeight: 600,
        padding: '0.35rem 0.85rem',
        borderRadius: '0.5rem',
        background: 'var(--x-color-primary-600, #7c3aed)',
        color: '#fff',
        whiteSpace: 'nowrap'
      }}
    >
      Download
    </a>
  </Navbar>
)

const footer = (
  <Footer>
    <span>
      MIT {new Date().getFullYear()} ©{' '}
      <a href="https://github.com/hulryung/damson" target="_blank" rel="noreferrer">
        Damson
      </a>
      . The terminal built only for macOS.
    </span>
  </Footer>
)

export default async function RootLayout({ children }) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <Head
        color={{
          hue: 270,
          saturation: 90
        }}
      />
      <body>
        <Layout
          navbar={navbar}
          footer={footer}
          pageMap={await getPageMap()}
          docsRepositoryBase="https://github.com/hulryung/damson-web/tree/main"
          editLink="Edit this page on GitHub"
          sidebar={{ defaultMenuCollapseLevel: 1, toggleButton: true }}
          toc={{ backToTop: true }}
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}
