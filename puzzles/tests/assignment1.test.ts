import { describe, it, expect } from "vitest";
import { maxStockProfit } from "../problems/assignment1";

describe("maxStockProfit", () => {
  it("returns maximum profit when buy low and sell high", () => {
    const prices = [7, 1, 5, 3, 6, 4];
    expect(maxStockProfit(prices)).toBe(5); // Buy at 1, sell at 6
  });

  it("returns 0 when prices only decrease", () => {
    const prices = [7, 6, 4, 3, 1];
    expect(maxStockProfit(prices)).toBe(0); // No profit possible
  });

  it("handles profit opportunity after initial decrease", () => {
    const prices = [2, 4, 1, 7, 5];
    expect(maxStockProfit(prices)).toBe(6); // Buy at 1, sell at 7
  });

  it("returns 0 for single price", () => {
    const prices = [5];
    expect(maxStockProfit(prices)).toBe(0); // Can't buy and sell on same day
  });

  it("handles all same prices", () => {
    const prices = [3, 3, 3, 3];
    expect(maxStockProfit(prices)).toBe(0); // No profit when flat
  });

  it("returns profit when prices only increase", () => {
    const prices = [1, 2, 3, 4, 5];
    expect(maxStockProfit(prices)).toBe(4); // Buy at 1, sell at 5
  });

  it("handles multiple peaks, finds the best one", () => {
    const prices = [3, 2, 6, 5, 0, 3];
    expect(maxStockProfit(prices)).toBe(4); // Buy at 2, sell at 6 (not buy at 0, sell at 3)
  });

  it("handles large price swings", () => {
    const prices = [100, 1, 101, 50];
    expect(maxStockProfit(prices)).toBe(100); // Buy at 1, sell at 101
  });

  it("handles small consistent gains", () => {
    const prices = [1, 2, 1, 2, 1, 2];
    expect(maxStockProfit(prices)).toBe(1); // Multiple opportunities for profit of 1
  });
});
