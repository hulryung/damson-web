import { generateStaticParamsFor, importPage } from 'nextra/pages'
import { useMDXComponents as getMDXComponents } from '../../../mdx-components'

export const generateStaticParams = generateStaticParamsFor('mdxPath')

export async function generateMetadata(props) {
  const params = await props.params
  const { metadata } = await importPage(params.mdxPath, params.lang)
  const route = (params.mdxPath || []).filter(Boolean).join('/')
  return { ...metadata, alternates: { canonical: `/${params.lang}/${route}`, languages: { en: `/en/${route}`, ko: `/ko/${route}` } } }
}

const Wrapper = getMDXComponents().wrapper

export default async function Page(props) {
  const params = await props.params
  const result = await importPage(params.mdxPath, params.lang)
  const { default: MDXContent, toc, metadata } = result
  return (
    <Wrapper toc={toc} metadata={metadata}>
      <div lang={params.lang}>
        <MDXContent {...props} params={params} />
      </div>
    </Wrapper>
  )
}
