/**
 * Coffee Shop Order Queue Simulator
 *
 * You are simulating a coffee shop with multiple baristas. Orders arrive throughout
 * the day, and baristas work on them in the order they arrive. Each order takes a
 * certain amount of time to prepare. Your task is to simulate the order processing
 * and return which barista completed which orders.
 *
 * The system operates with these rules:
 * - Orders are processed in the order they arrive (first-come, first-served)
 * - When a barista becomes free, they take the next order in the queue
 * - If multiple baristas are free at the same time, the barista with the lower ID
 *   (came in as first in the baristas array) takes the order
 * - Each order has a preparation time (in minutes)
 * - All baristas start free at time 0
 * - Orders are assigned immediately when they arrive if a barista is free
 * - If no barista is free when an order arrives, it waits in the queue
 *
 * Input:
 * - numBaristas: the number of baristas working (they are numbered 0, 1, 2, ...)
 * - orders: an array of order objects in arrival order, where each order has:
 *   - id: string (unique order identifier)
 *   - arrivalTime: number (minute when the order arrives)
 *   - prepTime: number (minutes needed to prepare this order)
 *
 * Output:
 * An array of barista objects (one per barista, in order 0, 1, 2, ...), where each object has:
 * - baristaId: number (the barista's ID)
 * - completedOrders: string[] (array of order IDs this barista completed, in completion order)
 *
 * Examples:
 *
 * Example 1: One barista, two orders
 *   Input: numBaristas = 1, orders = [
 *     { id: "A", arrivalTime: 0, prepTime: 5 },
 *     { id: "B", arrivalTime: 2, prepTime: 3 }
 *   ]
 *   Output: [
 *     { baristaId: 0, completedOrders: ["A", "B"] }
 *   ]
 *   Explanation: Barista 0 takes order A at time 0, finishes at time 5.
 *                Order B arrives at time 2 but waits. At time 5, barista takes B, finishes at time 8.
 *
 * Example 2: Two baristas, two simultaneous orders
 *   Input: numBaristas = 2, orders = [
 *     { id: "A", arrivalTime: 0, prepTime: 5 },
 *     { id: "B", arrivalTime: 0, prepTime: 3 }
 *   ]
 *   Output: [
 *     { baristaId: 0, completedOrders: ["A"] },
 *     { baristaId: 1, completedOrders: ["B"] }
 *   ]
 *   Explanation: Both orders arrive at time 0. Barista 0 takes A, Barista 1 takes B.
 *
 * Example 3: Orders arrive while baristas are busy
 *   Input: numBaristas = 1, orders = [
 *     { id: "A", arrivalTime: 0, prepTime: 10 },
 *     { id: "B", arrivalTime: 5, prepTime: 2 },
 *     { id: "C", arrivalTime: 8, prepTime: 3 }
 *   ]
 *   Output: [
 *     { baristaId: 0, completedOrders: ["A", "B", "C"] }
 *   ]
 */

import { devNull } from "node:os";

type Barista = {
  baristaId: number;
  completedOrders: Order["id"][]
}

type WorkingBarista = {
  baristaId: number;
  completedOrders: Order["id"][]
  isFreeAt: number | null;
  currentOrder: Order | null;
}

type Order = {
  id: string;
  arrivalTime: number;
  prepTime: number
}

type Result = {
  completedOrders: string[];
  baristaId: number;
}[]

type CoffeeShop = {
  baristas: WorkingBarista[]
  currentTime: number
  currentOrders: Order[]
  ordersCompleted: Order[]
  ordersInProcess: Order[]
  ordersWaiting: Order[]
}

function baristaIsFinished(barista: WorkingBarista, time: number) {
  const baristaIsFinished = barista.isFreeAt ? (time >= barista.isFreeAt) : false
  console.log('isBaristaFinished times: ', barista.isFreeAt, time)
  console.log('isBaristaFinished?: ', baristaIsFinished)
  return baristaIsFinished
}

export function simulateCoffeeShop(numBaristas: number, orders: Order[]): Result {
  if (numBaristas === 0) return []
  const baristaArray: Barista[] = []
  for (let i = 0; i < numBaristas; i++) {
    baristaArray.push({ baristaId: i, completedOrders: [] })
  }
  if (orders.length === 0) return baristaArray

  const workingBaristas: WorkingBarista[] = baristaArray.map((barista) => {
    return { ...barista, isFreeAt: 0, currentOrder: null }
  })

  const ordersToComplete: Order[] = structuredClone(orders)
  const coffeeShopState: CoffeeShop = {
    baristas: workingBaristas,
    currentTime: 0,
    currentOrders: orders,
    ordersCompleted: [],
    ordersInProcess: [],
    ordersWaiting: []
  }

  // Ok let's solve it in text.
  // An order arrives!
  while (coffeeShopState.ordersCompleted.length != orders.length) {
    console.log('starting the loop')
    console.log('completedOrders: ', coffeeShopState.ordersCompleted)
    console.log('orders length: ', orders.length)
    // Check to see if any baristas have completed their jobs
    coffeeShopState.baristas.map(barista => {
      console.log('baristas have finished jobs?')
      if (baristaIsFinished(barista, coffeeShopState.currentTime) && barista.currentOrder) {
        console.log('order finished!')
        barista.completedOrders.push(barista.currentOrder.id)
        coffeeShopState.ordersInProcess = coffeeShopState.ordersInProcess.filter(order => order.id !== barista.currentOrder.id)
        coffeeShopState.ordersCompleted.push(barista.currentOrder)
        barista.currentOrder = null
        barista.isFreeAt = null
      }
      return { ...barista }
    })
    // Check to see if any new orders are ready
    ordersToComplete.forEach(order => {
      const nextOrderReady = coffeeShopState.currentTime >= order.arrivalTime ? ordersToComplete.shift() : null
      if (nextOrderReady) {
        console.log('order ready: ', nextOrderReady)
        coffeeShopState.ordersWaiting.push(nextOrderReady)
      }
    })

    // Check to see what baristas are ready to pick up new jobs
    coffeeShopState.ordersWaiting.forEach(order => {
      const freeBarista = coffeeShopState.baristas.find(barista => !barista.currentOrder)
      if (freeBarista && order) {
        const nextOrder = coffeeShopState.ordersWaiting.shift() as Order
        coffeeShopState.baristas[freeBarista.baristaId].currentOrder = nextOrder
        coffeeShopState.ordersInProcess.push(nextOrder)
        coffeeShopState.baristas[freeBarista.baristaId].isFreeAt = coffeeShopState.currentTime + order.prepTime
        console.log(`order ${order} assigned to: `, coffeeShopState.baristas[freeBarista.baristaId])
      }
    })

    coffeeShopState.currentTime++
    console.log('increased time to: ', coffeeShopState.currentTime)
    console.log('completed orders: ', coffeeShopState.ordersCompleted)
  }

  return coffeeShopState.baristas.map(barista => {
    return { completedOrders: barista.completedOrders, baristaId: barista.baristaId }
  })
}
