/**
 * Parking Garage Simulator
 *
 * You are building a simulation system for a parking garage. The garage has a fixed
 * capacity and processes events as cars enter and leave throughout the day. Your
 * task is to simulate all the events and return a summary of the garage state.
 *
 * The garage operates with these rules:
 * - Cars enter with a license plate (unique identifier)
 * - If the garage is full when a car tries to enter, that car is turned away
 * - Cars can only leave if they are currently in the garage
 * - If a car that's not in the garage tries to leave, ignore that event
 * - If a car tries to enter but is already in the garage, ignore that event
 *
 * Input:
 * - capacity: the maximum number of cars the garage can hold
 * - events: an array of event objects, processed in order, where each event has:
 *   - type: "enter" or "leave"
 *   - plate: the car's license plate (string)
 *
 * Output:
 * An object containing:
 * - parked: an array of license plates currently in the garage (in the order they entered)
 * - turnedAway: an array of license plates that were turned away (in the order they were turned away)
 *
 * Examples:
 *
 * Example 1:
 *   Input: capacity = 2, events = [
 *     { type: "enter", plate: "ABC123" },
 *     { type: "enter", plate: "XYZ789" },
 *   ]
 *   Output: {
 *     parked: ["ABC123", "XYZ789"],
 *     turnedAway: []
 *   }
 *
 * Example 2:
 *   Input: capacity = 1, events = [
 *     { type: "enter", plate: "ABC123" },
 *     { type: "enter", plate: "XYZ789" },
 *   ]
 *   Output: {
 *     parked: ["ABC123"],
 *     turnedAway: ["XYZ789"]
 *   }
 *
 * Example 3:
 *   Input: capacity = 2, events = [
 *     { type: "enter", plate: "ABC123" },
 *     { type: "enter", plate: "XYZ789" },
 *     { type: "leave", plate: "ABC123" },
 *     { type: "enter", plate: "DEF456" },
 *   ]
 *   Output: {
 *     parked: ["XYZ789", "DEF456"],
 *     turnedAway: []
 *   }
 */

type GarageEventType = "enter" | "leave"

type GarageEvent = {
  type: GarageEventType;
  plate: string;
}

type Garage = {
  parked: string[];
  turnedAway: string[];
}

export function simulateParkingGarage(capacity: number, events: GarageEvent[]): Garage {
  // Check for capacity
  const garage: Garage = { parked: [], turnedAway: [] }
  if (events.length === 0) return garage

  // loop over events to begin processing cars
  outer: for (let i = 0; i < events.length; i++) {
    const garageEventType = events[i].type
    const garageEventPlate = events[i].plate
    switch (garageEventType) {
      case "enter":
        if (garage.parked.length === capacity) {
          garage.turnedAway.push(garageEventPlate)
          break
        } else if (garage.parked.indexOf(garageEventPlate) !== -1) {
          break
        } else {
          garage.parked.push(garageEventPlate)
          break
        }
      // const enteredGarage = enterGarage(garage, garageEventPlate)
      case "leave":
        if (garage.parked.indexOf(garageEventPlate) > -1) {
          garage.parked = garage.parked.filter(plate => plate != garageEventPlate)
          break
        } else {
          break
        }

      default:
        throw new Error("invalid event type")
    }
  }

  return garage
}
