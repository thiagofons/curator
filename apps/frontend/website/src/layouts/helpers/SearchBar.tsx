import { plainify } from "@/lib/utils/textConverter"
import Fuse from "fuse.js"
import React, { useEffect, useRef, useState } from "react"
/**
 * Item shape consumed by the SearchBar. Typically adapted blog posts.
 */
export type SearchItem = {
  slug: string
  data: any
  content: any
}

/** Props for the SearchBar component. */
interface Props {
  searchList: SearchItem[]
}

/** Result item returned by Fuse.js. */
interface SearchResult {
  item: SearchItem
  refIndex: number
}

/**
 * Client-side search bar powered by Fuse.js fuzzy search.
 * Maintains query state in the URL via `?q=`.
 */
export default function SearchBar({ searchList }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [inputVal, setInputVal] = useState("")
  const [searchResults, setSearchResults] = useState<SearchResult[] | null>(
    null,
  )

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setInputVal(e.currentTarget.value)
  }

  const fuse = new Fuse(searchList, {
    keys: [
      "data.title",
      "data.categories",
      "data.tags",
    ],
    includeMatches: true,
    minMatchCharLength: 2,
    threshold: 0.5,
  })

  useEffect(() => {
    const searchUrl = new URLSearchParams(window.location.search)
    const searchStr = searchUrl.get("q")
    if (searchStr) setInputVal(searchStr)

    setTimeout(() => {
      const inputEl = inputRef.current
      if (inputEl) {
        const pos = searchStr?.length || 0
        inputEl.selectionStart = pos
        inputEl.selectionEnd = pos
      }
    }, 50)
  }, [])

  useEffect(() => {
    const inputResult = inputVal.length > 2 ? fuse.search(inputVal) : []
    setSearchResults(inputResult)

    if (inputVal.length > 0) {
      const searchParams = new URLSearchParams(window.location.search)
      searchParams.set("q", inputVal)
      const newRelativePathQuery = `${window.location.pathname}?${searchParams.toString()}`
      history.pushState(null, "", newRelativePathQuery)
    } else {
      history.pushState(null, "", window.location.pathname)
    }
  }, [
    inputVal,
    fuse.search,
  ])

  return (
    <div className="min-h-[45vh]">
      <input
        autoComplete="off"
        // biome-ignore lint/a11y/noAutofocus: Auto focus on load is intended here
        autoFocus={true}
        className="form-input w-full"
        name="search"
        onChange={handleChange}
        placeholder="Busque posts"
        ref={inputRef}
        type="text"
        value={inputVal}
      />

      <div className="row">
        <div className="mx-auto px-0 lg:col-8">
          {inputVal.length > 1 && (
            <h2 className="mt-8 mb-4 font-normal">
              Encontrado(s) {searchResults?.length}
              {searchResults?.length && searchResults?.length === 1
                ? " resultado"
                : " resultados"}{" "}
              para <span className="text-primary">{inputVal}</span>
            </h2>
          )}
          {searchResults?.length ? (
            <div className="rounded py-12 px-9 shadow md:p-[60px]">
              {searchResults?.map(({ item }) => (
                <div
                  className="card mb-12 border-b border-border pb-[30px]"
                  key={item.slug}
                >
                  <h3 className="h4">
                    <a
                      className="block font-normal text-primary hover:underline"
                      href={`/blog/posts/${item.slug}`}
                    >
                      {item.data.title}
                    </a>
                  </h3>
                  <p className="mt-2.5 text-lg text-text line-clamp-2">
                    {plainify(item.content)}
                  </p>
                  <p className="mt-3 text-lg">
                    Categorias:{" "}
                    {item.data.categories?.map(
                      (category: string, index: number) => (
                        <a
                          // biome-ignore lint/a11y/useValidAnchor: Categories are supposed to be clicable links
                          href="#"
                          key={index}
                        >
                          {category}
                        </a>
                      ),
                    )}
                  </p>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
