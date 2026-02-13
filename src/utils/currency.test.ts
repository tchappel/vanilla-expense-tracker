import { describe, it, expect } from "vitest";
import currency from "./currency";

describe("currency.format", () => {
  it("formats positive numbers", () => {
    expect(currency.format(10.5)).toBe("$10.50");
    expect(currency.format(100)).toBe("$100.00");
  });

  it("formats negative numbers", () => {
    expect(currency.format(-5)).toBe("-$5.00");
    expect(currency.format(-10.5)).toBe("-$10.50");
  });

  it("formats zero", () => {
    expect(currency.format(0)).toBe("$0.00");
  });

  it("formats large numbers with thousands separator", () => {
    expect(currency.format(1234.56)).toBe("$1,234.56");
    expect(currency.format(1000000)).toBe("$1,000,000.00");
  });

  it("rounds to two decimal places", () => {
    expect(currency.format(10.999)).toBe("$11.00");
    expect(currency.format(10.555)).toBe("$10.56");
  });

  it("formats very small numbers", () => {
    expect(currency.format(0.01)).toBe("$0.01");
    expect(currency.format(0.99)).toBe("$0.99");
  });
});
