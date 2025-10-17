import { describe, it, expect } from "vitest";
import { findTopStudent } from "../problems/assignment1";

describe("findTopStudent", () => {
  it("returns the student with the highest average score", () => {
    const scores = [
      { student: "Alice", score: 80 },
      { student: "Bob", score: 70 },
      { student: "Alice", score: 90 },
      { student: "Bob", score: 85 },
    ];
    expect(findTopStudent(scores)).toBe("Alice"); // Alice: 85 avg, Bob: 77.5 avg
  });

  it("returns empty string for empty array", () => {
    expect(findTopStudent([])).toBe("");
  });

  it("returns the only student when there is one score", () => {
    const scores = [{ student: "Charlie", score: 75 }];
    expect(findTopStudent(scores)).toBe("Charlie");
  });

  it("handles tie by returning the student who appeared first", () => {
    const scores = [
      { student: "Alice", score: 80 },
      { student: "Bob", score: 90 },
      { student: "Alice", score: 100 },
      { student: "Bob", score: 70 },
    ];
    expect(findTopStudent(scores)).toBe("Alice"); // Both have 80 avg, Alice first
  });

  it("handles single scores for each student", () => {
    const scores = [
      { student: "Alice", score: 60 },
      { student: "Bob", score: 80 },
      { student: "Charlie", score: 90 },
    ];
    expect(findTopStudent(scores)).toBe("Charlie");
  });

  it("treats student names as case-sensitive", () => {
    const scores = [
      { student: "alice", score: 100 },
      { student: "Alice", score: 50 },
      { student: "alice", score: 100 },
    ];
    expect(findTopStudent(scores)).toBe("alice"); // alice: 100 avg, Alice: 50 avg
  });

  it("handles perfect scores", () => {
    const scores = [
      { student: "Alice", score: 100 },
      { student: "Bob", score: 95 },
      { student: "Alice", score: 100 },
    ];
    expect(findTopStudent(scores)).toBe("Alice");
  });

  it("handles many scores for same student", () => {
    const scores = [
      { student: "Alice", score: 70 },
      { student: "Alice", score: 80 },
      { student: "Alice", score: 90 },
      { student: "Bob", score: 85 },
      { student: "Bob", score: 75 },
    ];
    expect(findTopStudent(scores)).toBe("Alice"); // Alice: 80 avg, Bob: 80 avg, Alice first
  });

  it("handles zero scores", () => {
    const scores = [
      { student: "Alice", score: 0 },
      { student: "Bob", score: 50 },
      { student: "Alice", score: 0 },
    ];
    expect(findTopStudent(scores)).toBe("Bob");
  });
});
