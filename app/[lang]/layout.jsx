import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Head, Search } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import LanguageSwitch from '../language-switch'
import 'nextra-theme-docs/style.css'
import '../globals.css'

export async function generateMetadata({ params }) {
  const { lang } = await params
  const ko = lang === 'ko'
  const title = ko ? 'Damson — Mac을 위해 만든 터미널' : 'Damson — The terminal built only for macOS'
  const description = ko ? 'Swift와 Metal로 만든 macOS 전용 터미널. 부드러운 스크롤, 정확한 한글 입력, 분할 화면과 AI 작업 관리를 만나보세요.' : 'A native macOS terminal built with Swift and Metal. Smooth scrolling, Unicode input, split panes, and tools for AI coding workflows.'
  return { metadataBase: new URL('https://damson.app'), title: { default: title, template: '%s — Damson' }, description,
    icons: { icon: '/logo.png' }, applicationName: 'Damson',
    openGraph: { type: 'website', siteName: 'Damson', title, description, locale: ko ? 'ko_KR' : 'en_US', images: ['/og.png'] },
    twitter: { card: 'summary_large_image', title, description, images: ['/og.png'] } }
}
// Nextra's locale page maps contain paths relative to the locale root.
function localizePageMap(items, lang) {
  return items.map(item => ({
    ...item,
    ...(item.route ? { route: `/${lang}${item.route === '/' ? '' : item.route}` } : {}),
    ...(item.children ? { children: localizePageMap(item.children, lang) } : {})
  }))
}
export default async function RootLayout({ children, params }) {
  const { lang } = await params
  if (!['en','ko'].includes(lang)) notFound()
  const ko = lang === 'ko'
  const logo = <span style={{ display:'flex', alignItems:'center', gap:'.5rem' }}><Image src="/logo.png" alt="" width={26} height={26} priority /><b>Damson</b></span>
  const navbar = <Navbar logo={logo} logoLink={`/${lang}`} projectLink="https://github.com/hulryung/damson">
    <a href={`/${lang}/manual`} className="nav-manual">{ko ? '사용 설명서' : 'User manual'}</a>
    <LanguageSwitch lang={lang} />
    <a href="https://github.com/hulryung/damson/releases/latest/download/Damson.dmg" className="nav-download">{ko ? '다운로드' : 'Download'}</a>
  </Navbar>
  const footer = <Footer><span>MIT {new Date().getFullYear()} © <a href="https://github.com/hulryung/damson">Damson</a> · {ko ? 'Mac을 위해 만든 터미널.' : 'The terminal built only for macOS.'}</span></Footer>
  return <html lang={lang} dir="ltr" suppressHydrationWarning><Head color={{ hue:270, saturation:90 }} /><body>
    <Layout navbar={navbar} footer={footer} pageMap={localizePageMap(await getPageMap(`/${lang}`), lang)}
      docsRepositoryBase="https://github.com/hulryung/damson-web/tree/main"
      editLink={ko ? 'GitHub에서 이 문서 수정' : 'Edit this page on GitHub'}
      feedback={{ content: ko ? '의견 보내기' : 'Give us feedback' }}
      themeSwitch={ko ? { dark:'어두운 테마', light:'밝은 테마', system:'시스템 설정' } : undefined}
      sidebar={{ defaultMenuCollapseLevel:1, toggleButton:true }}
      toc={{ backToTop: ko ? '맨 위로' : 'Scroll to top', title: ko ? '이 페이지에서' : 'On this page' }}
      search={<Search key={lang} placeholder={ko ? '문서 검색…' : 'Search documentation…'} emptyResult={ko ? '검색 결과가 없습니다.' : 'No results found.'} loading={ko ? '검색 중…' : 'Loading…'} errorText={ko ? '검색 색인을 불러오지 못했습니다.' : 'Failed to load search index.'} />}
    >{children}</Layout>
  </body></html>
}
