import React, { useRef } from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Modal from "./";

describe("Modal", () => {
  // title, close btn, nominees for every category
  it("renders the modal", () => {
    const payload = {
      "category A": "Dude One",
      "category B": "Person Two",
    };

    // render the modal
    render(<Modal isOpen payload={payload} />);

    // modal is visible
    const modal = screen.getByRole("dialog");
    expect(modal).toBeVisible();

    // title is visible
    expect(screen.getByText("Success")).toBeVisible();

    // nominees and categories are visible
    expect(screen.getByText("category A")).toBeVisible();
    expect(screen.getByText("Dude One")).toBeVisible();
    expect(screen.getByText("category B")).toBeVisible();
    expect(screen.getByText("Person Two")).toBeVisible();

    // close button is visible
    expect(screen.getByText("×")).toBeVisible();

    // can close the modal by clicking the close button
    // screen.getByText("×").click();
    // jsdom can't simulate dialog methods yet, I'm washing my hands
  });
});
