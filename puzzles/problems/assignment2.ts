/**
 * Auditorium Seating — Contiguous Group Placement with Blocked Seats
 *
 * You manage seating for a small auditorium with several rows. Each row has a fixed
 * number of seats (indexed from 0). Some seats may be blocked (e.g., broken) and
 * cannot be used. A queue of groups arrives; each group must be seated contiguously
 * within a single row. Process groups in order using a deterministic strategy:
 *
 * 1) Scan rows from top (index 0) to bottom; in each row, seat the group in the
 *    first left-to-right contiguous free segment that fits the whole group.
 * 2) Do not split groups across rows. If no segment fits, the group is waitlisted.
 * 3) Blocked seats are never assignable and remain blocked forever.
 * 4) Output should show each seat as either the occupying group id (string), "#"
 *    for blocked, or null for empty/unassigned.
 *
 * Input:
 *  - rows: number[] — capacities for each row (length >= 0, each capacity >= 0).
 *  - groups: Array<{ id: string; size: number }> — processed in given order;
 *    each size is an integer >= 1; ids are unique non-empty strings.
 *  - blocked (optional): number[][] — for each row index `r`, blocked[r] lists
 *    seat indices (0-based) within that row to mark as unavailable. Omitted rows
 *    imply no blocked seats; out-of-range indices should be treated as invalid input.
 *
 * Output:
 *  - { seating: (string | "#" | null)[][], waitlist: string[] }
 *    where seating[r][c] is the final occupant of seat c in row r.
 *
 * Edge Cases & Rules:
 *  - If `rows` is empty, everyone is waitlisted.
 *  - If a row has capacity 0, skip it as it has no seats.
 *  - A group larger than any available contiguous segment is waitlisted.
 *  - If `blocked` specifies duplicates for the same seat, it’s still blocked ("#").
 *  - Invalid blocked indices (negative or >= row capacity) should cause the function
 *    to throw an Error with a clear message.
 *
 * Examples:
 *  - rows=[5], groups=[{id:"g1",size:3}], blocked=[[]]
 *    -> seating: [["g1","g1","g1",null,null]], waitlist:[]
 *  - rows=[4,4], groups=[{id:"a",size:2},{id:"b",size:3}], blocked=[[1],[2]]
 *    Row0 seats: [0,2,3] free; first fit for "a" is seats [2,3]. "b" can't fit row0,
 *    fits row1 at [0,1,3?] no (blocked at 2 breaks), but [0,1,3] is non-contiguous, so
 *    first contiguous fit is [0,1,3?] invalid; try [0,1] length 2 not enough; thus b seats
 *    at [0,1,?] cannot; next row segments [0,1] and [3] don't fit 3 -> waitlist ["b"].
 *
 * Implement the function below. You may add small internal helpers and types (not exported).
 * Prefer clarity over cleverness. Avoid mutating inputs.
 */

type Rows = Array<number>
type Group = {
  id: string;
  size: number;
}
type BlockList = Array<Array<number>>
type Segment = Array<Group["id"] | "#" | null>
type Seating = Array<Segment>
type Waitlist = Array<Group["id"]>

function generateSeatingFromRows(rows: Rows, blocked: BlockList | undefined) {
  return rows.map((row: number, index: number) => {
    const seatingRow: Segment = Array(row).fill(null)
    // this is kinda ugly
    if (!blocked) return seatingRow
    blocked[index].forEach((block: number) => {
      seatingRow[block] = "#"
    })
    return seatingRow
  })
}

// I am unclear on what this is doing. Don't rush, think. You are unclear on this system.
// function generateContiguousSegments(seating) {
//   return seating.map(row => {
//     let contiguousSegmentArray = []
//     row.forEach(seat => {
//       seat === null ? contiguousSegmentArray.push(seat)
//     })
//   })
// }

function processGroupsIntoSegmentsOrWaitlist(seating: Seating, groups: Group[]) {

  const finalSeating: Seating = structuredClone(seating)
  const waitlist: Waitlist = []

  // Start going through the groups
  // For each group, run through the total seating row by row
  // On each row, count off available seats and push them to an array
  // If enough seats are available, break off the flow and seat the group
  // Move to the next  group
  // If there's never enough seats, push the group to waitlist

  groups.forEach(group => {
    let segmentInRow: number[][] = []
    // all this is messy, solve one problem at a time.
    for (let i = 0; i < finalSeating.length; i++) {
      if (segmentInRow.length === group.size) break
      segmentInRow = []
      finalSeating[i].forEach((seat, index) => {
        if (segmentInRow.length === group.size) return
        if (seat === null) segmentInRow.push([i, index])
        if ((segmentInRow.length < group.size) && seat !== null) segmentInRow = []
      })
    }

    console.log("segment: ", segmentInRow)
    console.log("group: ", group)

    if (segmentInRow.length === group.size) {
      segmentInRow.forEach(seatArray => finalSeating[seatArray[0]][seatArray[1]] = group.id)
    } else {
      waitlist.push(group.id)
    }

  })
  return { finalSeating, waitlist }
}

function hasInvalidBlocks(rows, blocked): boolean {
  // iterate over the blocklist
  let invalidBlockPresent = false;
  blocked.forEach((block, rowIndex) => {
    const someResult = block.some((item, index) => {
      return item >= rows[rowIndex] || item < 0 || !Number.isInteger(item)
    })

    if (someResult) {
      invalidBlockPresent = true;
      console.log(invalidBlockPresent)
    }
  })

  return invalidBlockPresent
}

// NOTE: Intentionally omitting explicit parameter and return types for the exercise.
export function seatAuditorium(rows: Rows, groups: Group[], blocked?: BlockList) {
  if (!rows.length) return { seating: [], waitlist: groups.map(group => group.id) }
  if (hasInvalidBlocks(rows, blocked)) throw new Error("invalid blocks")
  // 1) Build initial seating matrix using rows + blocked.
  const seating: Seating = generateSeatingFromRows(rows, blocked)

  // 2) For each group (in order), scan each row and find the first contiguous segment of nulls of length >= size.
  // 3) If found, fill that segment with the group id; otherwise push id to waitlist.
  const { finalSeating, waitlist }: { finalSeating: Seating, waitlist: Waitlist } = processGroupsIntoSegmentsOrWaitlist(seating, groups)
  console.log("finalSeating: ", finalSeating)
  // 4) Return { seating, waitlist }.
  // Include small helpers like `findFirstFitSegment(rowSeats: (string | "#" | null)[], size: number): [start, endExclusive] | null`.
  return { seating: finalSeating, waitlist }
}