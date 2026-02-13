import { describe, expect, it } from "vitest";
import date from "./date";

describe("date.format", () => {
  it("should format dates as DD/MM/YYYY", () => {
    const testCases = [
      { localDate: new Date(2024, 2, 15), expected: "15/03/2024" }, // Standard date
      { localDate: new Date(2024, 0, 5), expected: "05/01/2024" }, // Zero-padded day and month
      { localDate: new Date(2024, 11, 31), expected: "31/12/2024" }, // Year end
      { localDate: new Date(2000, 0, 1), expected: "01/01/2000" }, // Year start
    ];

    testCases.forEach(({ localDate, expected }) => {
      const result = date.format(localDate.toISOString());
      expect(result).toBe(expected);
    });
  });
});
