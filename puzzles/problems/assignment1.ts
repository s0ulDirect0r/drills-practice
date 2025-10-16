/**
 * Most-Popular Tag Across Articles
 *
 * You’re given a list of articles, each with a set of tags. Count how many distinct
 * articles mention each tag (duplicates within the same article count once), and
 * return the single most-popular tag. On ties, return the alphabetically earliest tag.
 *
 * Input: Array<{ id: string; tags: string[] }>. Each `id` is non-empty. Tags are
 * non-empty strings; an article may contain duplicate tags. The array may be empty.
 * Output: string | null — the most-popular tag, or null when no tags exist.
 *
 * Examples:
 *  - [{id:"a",tags:["ts","js"]},{id:"b",tags:["js"]}] -> "js"
 *  - [{id:"a",tags:["go","go"]},{id:"b",tags:["py"]}] -> "go" (counts once per article)
 */

export function mostPopularTag(
  articles: { id: string; tags: string[] }[]
): string | null {
  // TODO: Implement
  // 1) For each article, de-duplicate its tags (Set).
  // 2) Count across articles (Map<string, number>).
  // 3) Choose max by count; tie-break by lexicographic order.
  // 4) Return null if no tags overall.
  throw new Error("Not implemented");
}