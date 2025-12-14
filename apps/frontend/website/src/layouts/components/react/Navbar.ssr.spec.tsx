// @vitest-environment node
import React from "react";
import { renderToString } from "react-dom/server";

import * as NavbarModule from "./Navbar";

describe("Navbar (SSR branch coverage)", () => {
  it("renders on server without window (no crash)", () => {
    const NavbarAny =
      (NavbarModule as any).Navbar ?? (NavbarModule as any).default;

    expect(NavbarAny).toBeTruthy();

    const html = renderToString(<NavbarAny />);

    expect(typeof html).toBe("string");
    expect(html.length).toBeGreaterThan(0);

    // CORREÇÃO: Verificamos o 'alt' da imagem real ou uma classe específica do header
    // Baseado no seu log de erro: alt="Curator"
    expect(html).toContain('alt="Curator"');

    // Opcional: Verificar se links críticos foram renderizados
    expect(html).toContain('href="/"');
  });

  it("renders when a global window exists (covers window-present branch)", () => {
    const NavbarAny =
      (NavbarModule as any).Navbar ?? (NavbarModule as any).default;

    const prevWindow = (globalThis as any).window;
    // Mock mínimo de window necessário para não quebrar a lógica de 'typeof window'
    (globalThis as any).window = {
      location: { href: "http://localhost/en/", pathname: "/en/" },
      scrollY: 0,
      addEventListener: () => {},
      removeEventListener: () => {},
    };

    try {
      const html = renderToString(<NavbarAny />);
      expect(typeof html).toBe("string");
      expect(html.length).toBeGreaterThan(0);
      expect(html).toContain('alt="Curator"');
    } finally {
      (globalThis as any).window = prevWindow;
    }
  });
});
