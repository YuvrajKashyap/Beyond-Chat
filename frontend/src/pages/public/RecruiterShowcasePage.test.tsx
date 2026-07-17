import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import RecruiterShowcasePage from "./RecruiterShowcasePage";

describe("RecruiterShowcasePage", () => {
  it("labels synthetic data and exposes each product view", () => {
    render(<MemoryRouter><RecruiterShowcasePage /></MemoryRouter>);

    expect(screen.getByText(/synthetic data/i)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Build a US market-entry brief" })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("tab", { name: "Durable output" }));
    expect(screen.getByRole("heading", { name: "US market-entry recommendation" })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("tab", { name: "System design" }));
    expect(screen.getByRole("heading", { name: /durable execution contract/i })).toBeInTheDocument();
  });
});
