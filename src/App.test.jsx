import { describe, test, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

import styles from "./components/Card/Card.module.scss";

import { useFetch } from "./__mocks__/useFetch";

beforeEach(() => {
  vi.mock("./hooks/useFetch", () => ({
    useFetch,
  }));
});

import App from "./App";

describe("App", () => {
  // Mock useFetch hook module

  test("renders the app", async () => {
    await render(<App />);
    // Check if the app title is rendered
    expect(screen.getByText("Awards 2021")).toBeInTheDocument();

    // category title by role
    expect(screen.getAllByTestId("cat-title")[0]).toBeInTheDocument();

    // Check if the submit button is rendered
    expect(screen.getByText("submit")).toBeInTheDocument();
  });

  test("selects a nominee", async () => {
    await render(<App />);

    // Select a nominee for a category
    // getByLabelText('Pick') random
    const labels = screen.getAllByLabelText("Pick");
    const randIndex = Math.floor(Math.random() * labels.length);
    const randLabel = labels[randIndex];
    await fireEvent.click(randLabel);

    // selected item has isSelected class
    expect(randLabel.closest("div")).toHaveClass(styles.isSelected);
  });

  test("opens a modal on submit", () => {
    render(<App />);

    // submit the form
    fireEvent.click(screen.getByText("submit"));

    // modal is visible
    expect(screen.getByRole("dialog")).toBeVisible();
  });
});
