import { test, assert } from "vitest";
import { getBallotData } from "./lib/ballot";

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

test("getBallotData should return an array of categories with nominees", () => {
  const result = getBallotData();

  // iterate through result
  result.forEach((category) => {
    assert(
      hasOwnProperty(category, "catName"),
      "Category should have a catName property"
    );

    assert(
      Array.isArray(category.nominees),
      "Category nominees should be an array"
    );

    category.nominees.forEach((nominee) => {
      assert(
        hasOwnProperty(nominee, "name"),
        "Nominee should have a name property"
      );

      assert(
        hasOwnProperty(nominee, "email"),
        "Nominee should have an email property"
      );

      assert(
        hasOwnProperty(nominee, "srcSet"),
        "Nominee should have a srcSet property"
      );
    });
  });
});
