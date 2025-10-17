import { describe, it, expect } from "vitest";
import { simulateCoffeeShop } from "../problems/assignment2";

describe("simulateCoffeeShop", () => {
  it("handles single barista with one order", () => {
    const result = simulateCoffeeShop(1, [
      { id: "A", arrivalTime: 0, prepTime: 5 },
    ]);
    expect(result).toEqual([
      { baristaId: 0, completedOrders: ["A"] },
    ]);
  });

  it("handles single barista with sequential orders", () => {
    const result = simulateCoffeeShop(1, [
      { id: "A", arrivalTime: 0, prepTime: 5 },
      { id: "B", arrivalTime: 2, prepTime: 3 },
    ]);
    expect(result).toEqual([
      { baristaId: 0, completedOrders: ["A", "B"] },
    ]);
  });

  it("handles two baristas with simultaneous orders", () => {
    const result = simulateCoffeeShop(2, [
      { id: "A", arrivalTime: 0, prepTime: 5 },
      { id: "B", arrivalTime: 0, prepTime: 3 },
    ]);
    expect(result).toEqual([
      { baristaId: 0, completedOrders: ["A"] },
      { baristaId: 1, completedOrders: ["B"] },
    ]);
  });

  it("handles no orders", () => {
    const result = simulateCoffeeShop(2, []);
    expect(result).toEqual([
      { baristaId: 0, completedOrders: [] },
      { baristaId: 1, completedOrders: [] },
    ]);
  });

  it("assigns lower-id barista when multiple are free", () => {
    const result = simulateCoffeeShop(3, [
      { id: "A", arrivalTime: 0, prepTime: 5 },
      { id: "B", arrivalTime: 0, prepTime: 5 },
      { id: "C", arrivalTime: 10, prepTime: 2 },
    ]);
    expect(result).toEqual([
      { baristaId: 0, completedOrders: ["A", "C"] },
      { baristaId: 1, completedOrders: ["B"] },
      { baristaId: 2, completedOrders: [] },
    ]);
  });

  it("queues orders when all baristas are busy", () => {
    const result = simulateCoffeeShop(1, [
      { id: "A", arrivalTime: 0, prepTime: 10 },
      { id: "B", arrivalTime: 5, prepTime: 2 },
      { id: "C", arrivalTime: 8, prepTime: 3 },
    ]);
    expect(result).toEqual([
      { baristaId: 0, completedOrders: ["A", "B", "C"] },
    ]);
  });

  it("handles complex scenario with multiple baristas and overlapping orders", () => {
    const result = simulateCoffeeShop(2, [
      { id: "A", arrivalTime: 0, prepTime: 10 },
      { id: "B", arrivalTime: 0, prepTime: 5 },
      { id: "C", arrivalTime: 3, prepTime: 2 },
      { id: "D", arrivalTime: 6, prepTime: 4 },
    ]);
    expect(result).toEqual([
      { baristaId: 0, completedOrders: ["A"] },
      { baristaId: 1, completedOrders: ["B", "C", "D"] },
    ]);
  });

  it("maintains order completion sequence correctly", () => {
    const result = simulateCoffeeShop(2, [
      { id: "A", arrivalTime: 0, prepTime: 3 },
      { id: "B", arrivalTime: 0, prepTime: 5 },
      { id: "C", arrivalTime: 0, prepTime: 2 },
      { id: "D", arrivalTime: 0, prepTime: 1 },
    ]);
    expect(result).toEqual([
      { baristaId: 0, completedOrders: ["A", "C", "D"] },
      { baristaId: 1, completedOrders: ["B"] },
    ]);
  });

  it("handles more orders than baristas", () => {
    const result = simulateCoffeeShop(2, [
      { id: "A", arrivalTime: 0, prepTime: 2 },
      { id: "B", arrivalTime: 0, prepTime: 2 },
      { id: "C", arrivalTime: 0, prepTime: 2 },
      { id: "D", arrivalTime: 0, prepTime: 2 },
      { id: "E", arrivalTime: 0, prepTime: 2 },
    ]);
    expect(result).toEqual([
      { baristaId: 0, completedOrders: ["A", "C", "E"] },
      { baristaId: 1, completedOrders: ["B", "D"] },
    ]);
  });
});
