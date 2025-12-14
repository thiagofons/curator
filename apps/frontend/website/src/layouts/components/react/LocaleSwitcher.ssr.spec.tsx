// @vitest-environment node
import React from "react";
import { renderToString } from "react-dom/server";

import { LocaleSwitcher } from "./LocaleSwitcher";

describe("LocaleSwitcher (SSR branch coverage)", () => {
  it("renders on server without window (no crash) using default path", () => {
    const html = renderToString(<LocaleSwitcher />);
    expect(typeof html).toBe("string");
    expect(html.length).toBeGreaterThan(0);
  });

  it("renders on server with an explicit initialPath (no crash)", () => {
    const html = renderToString(<LocaleSwitcher initialPath="/en/" />);
    expect(typeof html).toBe("string");
    expect(html.length).toBeGreaterThan(0);
  });
});
