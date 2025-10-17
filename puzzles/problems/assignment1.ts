/**
 * Stock Trading Profit Calculator
 *
 * You have access to historical stock prices for a single stock over several days.
 * You want to maximize your profit by buying on one day and selling on a later day.
 * You can only make one transaction (one buy + one sell), and you must buy before you sell.
 *
 * Given an array of prices where prices[i] represents the stock price on day i,
 * return the maximum profit you can achieve. If no profit is possible, return 0.
 *
 * Input:
 * - prices: number[] - Array of daily stock prices (non-negative integers)
 *   - Guaranteed to have at least 1 element
 *   - Prices can be in any order (can go up or down)
 *
 * Output:
 * - number - Maximum profit achievable, or 0 if no profit possible
 *
 * Examples:
 *
 * Example 1:
 *   Input: [7, 1, 5, 3, 6, 4]
 *   Output: 5
 *   Explanation: Buy on day 1 (price = 1), sell on day 4 (price = 6), profit = 6 - 1 = 5.
 *
 * Example 2:
 *   Input: [7, 6, 4, 3, 1]
 *   Output: 0
 *   Explanation: Prices only decrease, so no profit is possible.
 *
 * Example 3:
 *   Input: [2, 4, 1, 7, 5]
 *   Output: 6
 *   Explanation: Buy on day 2 (price = 1), sell on day 3 (price = 7), profit = 7 - 1 = 6.
 */

export function maxStockProfit(prices: number[]): number {
  // TODO: Implement this function
  let minPrice = prices[0];
  let maxProfit = 0;

  for (let i = 1; i < prices.length; i++) {
    const currentPrice = prices[i];
    let possibleProfit = currentPrice - minPrice;
    minPrice = Math.min(currentPrice, minPrice)
    maxProfit = Math.max(possibleProfit, maxProfit)
  }

  return maxProfit
}
