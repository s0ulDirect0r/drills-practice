import { describe, it, expect } from "vitest";
import { optimizeDeliveryRoutes } from "../problems/assignment3";

describe("optimizeDeliveryRoutes", () => {
  it("handles single driver with one package", () => {
    const result = optimizeDeliveryRoutes(
      { x: 0, y: 0 },
      [{ id: "D1", capacity: 10 }],
      [{ id: "P1", destination: { x: 3, y: 4 }, weight: 5, deadline: 20 }]
    );

    expect(result.routes).toHaveLength(1);
    expect(result.routes[0].driverId).toBe("D1");
    expect(result.routes[0].deliveries).toEqual(["P1"]);
    expect(result.routes[0].totalDistance).toBe(14); // 7 to destination + 7 back
    expect(result.totalDistance).toBe(14);
  });

  it("handles single driver with multiple packages", () => {
    const result = optimizeDeliveryRoutes(
      { x: 0, y: 0 },
      [{ id: "D1", capacity: 20 }],
      [
        { id: "P1", destination: { x: 1, y: 1 }, weight: 5, deadline: 10 },
        { id: "P2", destination: { x: 3, y: 4 }, weight: 10, deadline: 20 },
      ]
    );

    expect(result.routes).toHaveLength(1);
    expect(result.routes[0].driverId).toBe("D1");
    expect(result.routes[0].deliveries).toHaveLength(2);
    expect(result.totalDistance).toBeGreaterThan(0);
  });

  it("handles no packages", () => {
    const result = optimizeDeliveryRoutes(
      { x: 0, y: 0 },
      [{ id: "D1", capacity: 20 }],
      []
    );

    expect(result.routes).toHaveLength(1);
    expect(result.routes[0].deliveries).toEqual([]);
    expect(result.routes[0].totalDistance).toBe(0);
    expect(result.totalDistance).toBe(0);
  });

  it("distributes packages across multiple drivers", () => {
    const result = optimizeDeliveryRoutes(
      { x: 0, y: 0 },
      [
        { id: "D1", capacity: 10 },
        { id: "D2", capacity: 10 },
      ],
      [
        { id: "P1", destination: { x: 2, y: 0 }, weight: 8, deadline: 20 },
        { id: "P2", destination: { x: 0, y: 2 }, weight: 8, deadline: 20 },
      ]
    );

    expect(result.routes).toHaveLength(2);

    // Each driver should get at least one package
    const allDeliveries = result.routes.flatMap(r => r.deliveries);
    expect(allDeliveries).toContain("P1");
    expect(allDeliveries).toContain("P2");
    expect(allDeliveries).toHaveLength(2);
  });

  it("respects driver capacity constraints", () => {
    const result = optimizeDeliveryRoutes(
      { x: 0, y: 0 },
      [{ id: "D1", capacity: 10 }],
      [
        { id: "P1", destination: { x: 1, y: 0 }, weight: 6, deadline: 20 },
        { id: "P2", destination: { x: 2, y: 0 }, weight: 6, deadline: 20 },
      ]
    );

    // Driver can only carry one package at capacity 10
    expect(result.routes[0].deliveries).toHaveLength(1);
  });

  it("optimizes route order for efficiency", () => {
    const result = optimizeDeliveryRoutes(
      { x: 0, y: 0 },
      [{ id: "D1", capacity: 50 }],
      [
        { id: "P1", destination: { x: 5, y: 0 }, weight: 5, deadline: 50 },
        { id: "P2", destination: { x: 1, y: 0 }, weight: 5, deadline: 50 },
        { id: "P3", destination: { x: 3, y: 0 }, weight: 5, deadline: 50 },
      ]
    );

    // Should visit in order closest to farthest or similar optimization
    expect(result.routes[0].deliveries).toHaveLength(3);
    // Total distance should be reasonable (not visiting in worst order)
    expect(result.routes[0].totalDistance).toBeLessThan(20);
  });

  it("handles multiple drivers with different capacities", () => {
    const result = optimizeDeliveryRoutes(
      { x: 0, y: 0 },
      [
        { id: "D1", capacity: 5 },
        { id: "D2", capacity: 15 },
      ],
      [
        { id: "P1", destination: { x: 1, y: 1 }, weight: 10, deadline: 20 },
        { id: "P2", destination: { x: 2, y: 2 }, weight: 3, deadline: 20 },
      ]
    );

    expect(result.routes).toHaveLength(2);

    // Heavy package should go to driver with higher capacity
    const d1Route = result.routes.find(r => r.driverId === "D1");
    const d2Route = result.routes.find(r => r.driverId === "D2");

    expect(d2Route?.deliveries).toContain("P1");
  });

  it("calculates total distance correctly", () => {
    const result = optimizeDeliveryRoutes(
      { x: 0, y: 0 },
      [
        { id: "D1", capacity: 20 },
        { id: "D2", capacity: 20 },
      ],
      [
        { id: "P1", destination: { x: 2, y: 0 }, weight: 5, deadline: 20 },
        { id: "P2", destination: { x: 0, y: 3 }, weight: 5, deadline: 20 },
      ]
    );

    const sumOfRouteDistances = result.routes.reduce((sum, route) => sum + route.totalDistance, 0);
    expect(result.totalDistance).toBe(sumOfRouteDistances);
  });

  it("handles tight deadline constraints", () => {
    const result = optimizeDeliveryRoutes(
      { x: 0, y: 0 },
      [{ id: "D1", capacity: 20 }],
      [
        { id: "P1", destination: { x: 1, y: 0 }, weight: 5, deadline: 3 },
        { id: "P2", destination: { x: 5, y: 0 }, weight: 5, deadline: 6 },
      ]
    );

    // P1 should be delivered before P2 due to tighter deadline
    expect(result.routes[0].deliveries[0]).toBe("P1");
  });
});
