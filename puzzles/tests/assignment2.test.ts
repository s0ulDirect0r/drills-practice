import { describe, it, expect } from "vitest";
import { simulateParkingGarage } from "../problems/assignment2";

describe("simulateParkingGarage", () => {
  it("handles basic parking scenario", () => {
    const result = simulateParkingGarage(2, [
      { type: "enter", plate: "ABC123" },
      { type: "enter", plate: "XYZ789" },
    ]);
    expect(result).toEqual({
      parked: ["ABC123", "XYZ789"],
      turnedAway: [],
    });
  });

  it("turns away cars when garage is full", () => {
    const result = simulateParkingGarage(1, [
      { type: "enter", plate: "ABC123" },
      { type: "enter", plate: "XYZ789" },
      { type: "enter", plate: "DEF456" },
    ]);
    expect(result).toEqual({
      parked: ["ABC123"],
      turnedAway: ["XYZ789", "DEF456"],
    });
  });

  it("allows cars to leave and new cars to enter", () => {
    const result = simulateParkingGarage(2, [
      { type: "enter", plate: "ABC123" },
      { type: "enter", plate: "XYZ789" },
      { type: "leave", plate: "ABC123" },
      { type: "enter", plate: "DEF456" },
    ]);
    expect(result).toEqual({
      parked: ["XYZ789", "DEF456"],
      turnedAway: [],
    });
  });

  it("handles empty event list", () => {
    const result = simulateParkingGarage(5, []);
    expect(result).toEqual({
      parked: [],
      turnedAway: [],
    });
  });

  it("ignores leave events for cars not in garage", () => {
    const result = simulateParkingGarage(2, [
      { type: "enter", plate: "ABC123" },
      { type: "leave", plate: "XYZ789" },
      { type: "enter", plate: "DEF456" },
    ]);
    expect(result).toEqual({
      parked: ["ABC123", "DEF456"],
      turnedAway: [],
    });
  });

  it("ignores duplicate enter events for same car", () => {
    const result = simulateParkingGarage(3, [
      { type: "enter", plate: "ABC123" },
      { type: "enter", plate: "ABC123" },
      { type: "enter", plate: "XYZ789" },
    ]);
    expect(result).toEqual({
      parked: ["ABC123", "XYZ789"],
      turnedAway: [],
    });
  });

  it("handles complex scenario with multiple entries and exits", () => {
    const result = simulateParkingGarage(3, [
      { type: "enter", plate: "CAR1" },
      { type: "enter", plate: "CAR2" },
      { type: "enter", plate: "CAR3" },
      { type: "enter", plate: "CAR4" },
      { type: "leave", plate: "CAR2" },
      { type: "enter", plate: "CAR5" },
      { type: "leave", plate: "CAR1" },
      { type: "leave", plate: "CAR3" },
      { type: "enter", plate: "CAR6" },
      { type: "enter", plate: "CAR7" },
    ]);
    expect(result).toEqual({
      parked: ["CAR5", "CAR6", "CAR7"],
      turnedAway: ["CAR4"],
    });
  });

  it("maintains order of parked cars based on entry time", () => {
    const result = simulateParkingGarage(3, [
      { type: "enter", plate: "FIRST" },
      { type: "enter", plate: "SECOND" },
      { type: "leave", plate: "FIRST" },
      { type: "enter", plate: "THIRD" },
      { type: "enter", plate: "FOURTH" },
    ]);
    expect(result).toEqual({
      parked: ["SECOND", "THIRD", "FOURTH"],
      turnedAway: [],
    });
  });

  it("handles zero capacity garage", () => {
    const result = simulateParkingGarage(0, [
      { type: "enter", plate: "ABC123" },
      { type: "enter", plate: "XYZ789" },
    ]);
    expect(result).toEqual({
      parked: [],
      turnedAway: ["ABC123", "XYZ789"],
    });
  });
});
