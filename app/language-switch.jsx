'use client'
import { usePathname } from 'next/navigation'
export default function LanguageSwitch({ lang }) {
  const path = usePathname()
  const other = lang === 'ko' ? 'en' : 'ko'
  const href = path.replace(/^\/(en|ko)(?=\/|$)/, `/${other}`)
  return <a href={href} hrefLang={other} className="language-switch" aria-label={lang === 'ko' ? '영어로 보기' : 'Read in Korean'}>{lang === 'ko' ? '영어' : 'Korean'}</a>
}
