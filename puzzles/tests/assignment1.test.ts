import { describe, it, expect } from "vitest";
import { findMostPopularGenre } from "../problems/assignment1";

describe("findMostPopularGenre", () => {
  it("returns the genre with the most checkouts", () => {
    const checkouts = [
      { title: "1984", genre: "Fiction" },
      { title: "Sapiens", genre: "History" },
      { title: "Dune", genre: "Fiction" },
      { title: "Foundation", genre: "Fiction" },
    ];
    expect(findMostPopularGenre(checkouts)).toBe("Fiction");
  });

  it("returns empty string for empty array", () => {
    expect(findMostPopularGenre([])).toBe("");
  });

  it("returns the only genre when there is one checkout", () => {
    const checkouts = [{ title: "The Hobbit", genre: "Fantasy" }];
    expect(findMostPopularGenre(checkouts)).toBe("Fantasy");
  });

  it("handles tie by returning the genre that appeared first", () => {
    const checkouts = [
      { title: "Book A", genre: "Mystery" },
      { title: "Book B", genre: "Thriller" },
      { title: "Book C", genre: "Mystery" },
      { title: "Book D", genre: "Thriller" },
    ];
    expect(findMostPopularGenre(checkouts)).toBe("Mystery");
  });

  it("handles tie when second genre appears first overall", () => {
    const checkouts = [
      { title: "Book A", genre: "Romance" },
      { title: "Book B", genre: "Biography" },
      { title: "Book C", genre: "Romance" },
    ];
    expect(findMostPopularGenre(checkouts)).toBe("Romance");
  });

  it("treats genres as case-sensitive", () => {
    const checkouts = [
      { title: "Book 1", genre: "fiction" },
      { title: "Book 2", genre: "Fiction" },
      { title: "Book 3", genre: "fiction" },
    ];
    expect(findMostPopularGenre(checkouts)).toBe("fiction");
  });

  it("works with many different genres", () => {
    const checkouts = [
      { title: "A", genre: "Horror" },
      { title: "B", genre: "Comedy" },
      { title: "C", genre: "Drama" },
      { title: "D", genre: "Horror" },
      { title: "E", genre: "Horror" },
      { title: "F", genre: "Comedy" },
    ];
    expect(findMostPopularGenre(checkouts)).toBe("Horror");
  });

  it("handles all checkouts being the same genre", () => {
    const checkouts = [
      { title: "Book 1", genre: "Science" },
      { title: "Book 2", genre: "Science" },
      { title: "Book 3", genre: "Science" },
    ];
    expect(findMostPopularGenre(checkouts)).toBe("Science");
  });
});
