/**
 * Library Checkout Analyzer
 *
 * You are analyzing checkout data from a library system. Each checkout record
 * contains a book title and its genre. Your task is to find which genre has
 * the most total checkouts and return that genre name.
 *
 * Input: An array of checkout records, where each record is an object with:
 *   - title: string (the book title)
 *   - genre: string (the book's genre)
 *
 * Output: A string representing the genre with the most checkouts.
 *
 * Invariants:
 *   - If the array is empty, return an empty string
 *   - If there is a tie, return the genre that appeared first in the input
 *   - Genre names are case-sensitive
 *
 * Examples:
 *   Input: [
 *     { title: "1984", genre: "Fiction" },
 *     { title: "Sapiens", genre: "History" },
 *     { title: "Dune", genre: "Fiction" }
 *   ]
 *   Output: "Fiction" (appears 2 times)
 *
 *   Input: []
 *   Output: ""
 */

export function findMostPopularGenre(
  checkouts: Array<{ title: string; genre: string }>
): string {
  // TODO: Implement this function
  throw new Error("Not implemented");
}
