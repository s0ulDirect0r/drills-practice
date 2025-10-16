// puzzles/tests/assignment2.test.ts
import { describe, it, expect } from "vitest";
import { seatAuditorium } from "../problems/assignment2";

function makeRow(cap: number, fill: (string | "#" | null)[] = []): (string | "#" | null)[] {
  const row = Array<(string | "#" | null)>(cap).fill(null);
  for (let i = 0; i < Math.min(cap, fill.length); i++) row[i] = fill[i];
  return row;
}

describe("seatAuditorium", () => {
  it("minimal: no groups, single small row, no blocked -> empty seating, empty waitlist", () => {
    const result = seatAuditorium([3], [], [[]]);
    expect(result).toEqual({
      seating: [makeRow(3)],
      waitlist: [],
    });
  });

  it("throws on invalid blocked indices (negative or out of range)", () => {
    expect(() => seatAuditorium([2], [{ id: "g", size: 1 }], [[-1]])).toThrow();
    expect(() => seatAuditorium([2], [{ id: "g", size: 1 }], [[2]])).toThrow();
  });

  it("forces the contiguous-segment abstraction (blocked seats create segments)", () => {
    // Row of 6 seats with blocks at 1 and 4 => segments: [0], [2,3], [5]
    // Group g2 size=2 must be placed into [2,3]; g1 size=1 lands first at row0 seat 0.
    const rows = [6];
    const groups = [
      { id: "g1", size: 1 },
      { id: "g2", size: 2 },
      { id: "g3", size: 1 },
    ];
    const blocked = [[1, 4]];
    const r = seatAuditorium(rows, groups, blocked);
    expect(r.seating).toEqual([
      [
        "g1", // 0
        "#",  // 1 blocked
        "g2", // 2
        "g2", // 3
        "#",  // 4 blocked
        "g3", // 5
      ],
    ]);
    expect(r.waitlist).toEqual([]);
  });

  it("realistic: multiple rows, left-to-right first-fit per row, top-to-bottom across rows", () => {
    const rows = [5, 4, 6];
    const blocked = [
      [2],     // row0: [0,1] free, [3,4] free
      [],      // row1: [0..3] free
      [0, 5],  // row2: [1,2,3,4] free
    ];
    const groups = [
      { id: "a", size: 2 }, // row0 seats [0,1]
      { id: "b", size: 3 }, // row0: remaining segments [3,4] length 2 -> no; row1 [0..2] fits -> [0,1,2]
      { id: "c", size: 1 }, // row0 first segment [3] -> seat 3
      { id: "d", size: 2 }, // row0 remaining [4] len1 -> no; row1 remaining [3] len1 -> no; row2 [1,2] -> seat [1,2]
      { id: "e", size: 4 }, // row0 none; row1 none; row2 [3,4] len2 -> no -> waitlist
      { id: "f", size: 1 }, // row0 seat 4
    ];
    const r = seatAuditorium(rows, groups, blocked);
    expect(r.seating).toEqual([
      // row 0: cap 5, blocked at 2
      ["a", "a", "#", "c", "f"],
      // row 1: cap 4
      ["b", "b", "b", null],
      // row 2: cap 6, blocked at 0 and 5
      ["#", "d", "d", null, null, "#"],
    ]);
    expect(r.waitlist).toEqual(["e"]);
  });

  it("waitlists groups that cannot fit anywhere even with partial gaps available", () => {
    const rows = [3, 3];
    const blocked = [[1], [1]];
    const groups = [
      { id: "x", size: 2 }, // row0: [0] & [2] only -> cannot fit; row1 same -> waitlist
      { id: "y", size: 1 }, // row0 seat 0
      { id: "z", size: 1 }, // row0 seat 2
      { id: "w", size: 1 }, // row1 seat 0
    ];
    const r = seatAuditorium(rows, groups, blocked);
    expect(r.seating).toEqual([
      ["y", "#", "z"],
      ["w", "#", null],
    ]);
    expect(r.waitlist).toEqual(["x"]);
  });
});