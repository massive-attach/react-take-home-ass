import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Card from "./";
import styles from "./Card.module.scss";

describe("Card", () => {
  const nominee = {
    name: "Bob Ross",
    srcSet: "test.jpg",
  };

  render(<Card nominee={nominee} isSelected={false} />);

  test("renders the nominee name and image", () => {
    //title
    expect(screen.getByText(nominee.word)).toBeVisible();

    // portrait
    expect(screen.getByAltText(nominee.word)).toHaveAttribute(
      "src",
      nominee.srcSet
    );

    // pick "btn"
    expect(screen.getByText("Pick")).toBeVisible();

    // radio (hidden)
    const radio = screen.getByRole("radio", { hidden: true });
    expect(radio).toHaveAttribute("name", "nominee");
    expect(radio).toHaveAttribute("value", nominee.word);
  });

  test("applies the isSelected style", () => {
    render(<Card nominee={nominee} isSelected={true} />);
    expect(screen.getByText(nominee.word).closest("div")).toHaveClass(
      styles.isSelected
    );
  });
});
