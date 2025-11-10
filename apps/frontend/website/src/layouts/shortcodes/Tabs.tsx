import { marked } from "marked";
import React, { useEffect, useRef, useState } from "react";

const Tabs = ({ children }: { children: React.ReactElement }) => {
  const [active, setActive] = useState<number>(0);
  const [defaultFocus, setDefaultFocus] = useState<boolean>(false);

  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  useEffect(() => {
    if (defaultFocus) {
      //@ts-ignore
      tabRefs.current[active]?.focus();
    } else {
      setDefaultFocus(true);
    }
  }, [defaultFocus, active]);

  const tabLinks = Array.from(
    (children.props as any).value.matchAll(
      /<div\s+data-name="([^"]+)"[^>]*>((?:.|\n)*?)<\/div>/g,
    ),
    (match: RegExpMatchArray) => ({
      name: match[1],
      children: match[0],
    }),
  );

  const handleKeyDown = (
    event: React.KeyboardEvent<EventTarget>,
    index: number,
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      setActive(index);
    } else if (event.key === "ArrowRight") {
      setActive((active + 1) % tabLinks.length);
    } else if (event.key === "ArrowLeft") {
      setActive((active - 1 + tabLinks.length) % tabLinks.length);
    }
  };

  return (
    <div className="tab">
      <div aria-label="Tabs" className="tab-nav" role="tablist">
        {tabLinks.map(
          (
            item: {
              name: string | undefined;
              children: string;
            },
            index: number,
          ) => (
            <button
              aria-selected={index === active}
              className={`tab-nav-item ${index === active ? " active" : ""}`}
              key={index}
              onClick={() => setActive(index)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              ref={(ref) => {
                tabRefs.current[index] = ref;
              }}
              role="tab"
              tabIndex={index === active ? 0 : -1}
              type="button"
            >
              {item.name}
            </button>
          ),
        )}
      </div>
      {tabLinks.map(
        (
          item: {
            name: string | undefined;
            children: string;
          },
          i: number,
        ) =>
          (
            <div
              className={active === i ? "tab-content block px-5" : "hidden"}
              // biome-ignore lint/security/noDangerouslySetInnerHtml: Tabs content
              dangerouslySetInnerHTML={{
                __html: marked.parse(item.children),
              }}
              key={i}
            />
          ) as React.ReactElement<any>,
      )}
    </div>
  );
};

export default Tabs;
