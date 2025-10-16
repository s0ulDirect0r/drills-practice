// puzzles/tests/assignment1.test.ts
import { describe, it, expect } from "vitest";
import { mostPopularTag } from "../problems/assignment1";

describe("mostPopularTag", () => {
  it("returns null for empty input", () => {
    expect(mostPopularTag([])).toBeNull();
  });

  it("handles single article with multiple distinct tags", () => {
    const data = [{ id: "a", tags: ["ts", "js", "node"] }];
    // Each appears once in one article -> tie; alphabetical earliest: "js"
    expect(mostPopularTag(data)).toBe("js");
  });

  it("counts a tag at most once per article even if duplicated", () => {
    const data = [
      { id: "a", tags: ["go", "go", "go"] },
      { id: "b", tags: ["py"] },
      { id: "c", tags: ["go", "py"] },
    ];
    // go: in a,c -> 2; py: in b,c -> 2 -> tie, choose "go" (alphabetically earlier than "py")
    expect(mostPopularTag(data)).toBe("go");
  });

  it("prefers higher frequency over alphabetical order", () => {
    const data = [
      { id: "a", tags: ["z"] },
      { id: "b", tags: ["a", "z"] },
      { id: "c", tags: ["a"] },
      { id: "d", tags: ["a"] },
    ];
    // a appears in b,c,d (3); z appears in a,b (2)
    expect(mostPopularTag(data)).toBe("a");
  });

  it("tie-breaks alphabetically among multiple winners", () => {
    const data = [
      { id: "a", tags: ["k", "b"] },
      { id: "b", tags: ["b", "k"] },
      { id: "c", tags: ["k", "b", "b"] },
    ];
    // b in a,b,c -> 3; k in a,b,c -> 3 -> tie -> "b"
    expect(mostPopularTag(data)).toBe("b");
  });

  it("property-like table: each single-article case yields the earliest tag", () => {
    const cases: Array<{ tags: string[]; expected: string | null }> = [
      { tags: [], expected: null },
      { tags: ["alpha"], expected: "alpha" },
      { tags: ["beta", "alpha", "beta"], expected: "alpha" }, // tie in one article -> alphabetical
      { tags: ["x", "y", "z"], expected: "x" },
    ];
    for (const { tags, expected } of cases) {
      const input = [{ id: "only", tags }];
      expect(mostPopularTag(input)).toBe(expected);
    }
  });

  it("ignores articles with no tags but still considers others", () => {
    const data = [
      { id: "empty", tags: [] },
      { id: "a", tags: ["c", "a", "c"] },
      { id: "b", tags: ["b", "a"] },
    ];
    // counts per article: a in a,b (2); b in b (1); c in a (1) -> a
    expect(mostPopularTag(data)).toBe("a");
  });
});