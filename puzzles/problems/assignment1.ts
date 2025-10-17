/**
 * Student Grade Analyzer
 *
 * You are analyzing student test scores across multiple subjects. Each score record
 * contains a student name and their score. Your task is to find which student has
 * the highest average score across all their tests and return that student's name.
 *
 * Input: An array of score records, where each record is an object with:
 *   - student: string (the student's name)
 *   - score: number (the test score, between 0 and 100 inclusive)
 *
 * Output: A string representing the name of the student with the highest average score.
 *
 * Invariants:
 *   - If the array is empty, return an empty string
 *   - If there is a tie for highest average, return the student whose name appeared first in the input
 *   - Student names are case-sensitive
 *   - All scores are non-negative integers
 *
 * Examples:
 *   Input: [
 *     { student: "Alice", score: 85 },
 *     { student: "Bob", score: 90 },
 *     { student: "Alice", score: 95 }
 *   ]
 *   Output: "Alice" (average: 90, Bob's average: 90, but Alice appeared first)
 *
 *   Input: []
 *   Output: ""
 */

export function findTopStudent(scores: Array<{ student: string; score: number }>): string {
  // TODO: Implement this function
  throw new Error("Not implemented");
}
