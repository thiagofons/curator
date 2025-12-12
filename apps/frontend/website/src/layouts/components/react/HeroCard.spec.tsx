/**
 * @vitest-environment jsdom
 */
import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import React from "react";
import { HeroCard } from "./HeroCard";

describe("HeroCard", () => {
  it("renders all subcomponents correctly", () => {
    render(
      <HeroCard.Root>
        <HeroCard.Content>
          <HeroCard.Title>Test Title</HeroCard.Title>
          <HeroCard.Subtitle>Test Subtitle</HeroCard.Subtitle>
          <HeroCard.Actions>
            <button>Action</button>
          </HeroCard.Actions>
        </HeroCard.Content>
        <HeroCard.Image src="/test.jpg" alt="Test Image" />
      </HeroCard.Root>,
    );

    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Subtitle")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Action" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Test Image" })).toBeInTheDocument();
  });

  it("applies horizontal orientation classes by default", () => {
    const { container } = render(
      <HeroCard.Root>
        <div>Child</div>
      </HeroCard.Root>,
    );
    // The inner div should have md:grid-cols-2 for horizontal layout
    const gridContainer = container.querySelector(".grid");
    expect(gridContainer).toHaveClass("md:grid-cols-2");
  });

  it("applies vertical orientation classes when specified", () => {
    const { container } = render(
      <HeroCard.Root orientation="vertical">
        <div>Child</div>
      </HeroCard.Root>,
    );
    // The inner div should have grid-cols-1 for vertical layout
    const gridContainer = container.querySelector(".grid");
    expect(gridContainer).toHaveClass("grid-cols-1");
    expect(gridContainer).not.toHaveClass("md:grid-cols-2");
  });

  it("merges custom classNames", () => {
    render(
      <HeroCard.Root className="custom-root" data-testid="root">
        <HeroCard.Content className="custom-content" data-testid="content">
          Content
        </HeroCard.Content>
      </HeroCard.Root>,
    );

    const root = screen.getByTestId("root");
    expect(root).toHaveClass("custom-root");
    // Verify base classes are still present
    expect(root).toHaveClass("bg-card");

    const content = screen.getByTestId("content");
    expect(content).toHaveClass("custom-content");
  });

  it("renders Image with correct attributes and classes", () => {
    render(
      <HeroCard.Image src="test.png" alt="Alt Text" className="custom-img" />,
    );
    const img = screen.getByRole("img");

    expect(img).toHaveAttribute("src", "test.png");
    expect(img).toHaveAttribute("alt", "Alt Text");
    expect(img).toHaveClass("object-cover");
    expect(img).toHaveClass("custom-img");
    expect(img).toHaveAttribute("draggable", "false");
  });
});
