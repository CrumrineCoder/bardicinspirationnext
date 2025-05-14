import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Page from "../src/app/page";

test("Landing Page Loads", () => {
  render(<Page />);
  expect(screen.getByRole("link", { name: "Find More Songs" })).toBeDefined();
  expect(screen.getByTestId("landing-container")).toBeDefined();
});
