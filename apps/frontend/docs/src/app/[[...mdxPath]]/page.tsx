import { generateStaticParamsFor, importPage } from "nextra/pages"
import { useMDXComponents as getMdxComponents } from "@/mdx-components"

export const generateStaticParams = generateStaticParamsFor("mdxPath")

export async function generateMetadata(props: any) {
  const params = await props.params
  const { metadata } = await importPage(params.mdxPath)
  return metadata
}

const Wrapper = getMdxComponents().wrapper

export default async function Page(props: any) {
  const params = await props.params
  const {
    default: MdxContent,
    toc,
    metadata,
    sourceCode,
  } = await importPage(params.mdxPath)
  return (
    <Wrapper
      metadata={metadata}
      sourceCode={sourceCode}
      toc={toc}
    >
      <MdxContent
        {...props}
        params={params}
      />
    </Wrapper>
  )
}
