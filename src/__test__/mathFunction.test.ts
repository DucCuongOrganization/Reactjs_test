import { divide, multiply, substract, sum } from "../utils/mathFunction";

describe("Math functions", () => {
  test("sum correctly 2 values", () => {
    expect(sum()).toBe(0);
    expect(sum(1, 1)).toBe(2);
    expect(sum(0, 0)).toBe(0);
    expect(sum(0, -1)).toBe(-1);
    expect(sum(-1, -1)).toBe(-2);
    expect(sum(-1.5, 0.5)).toBe(-1);
  });

  test("substract correctly 2 values", () => {
    expect(substract()).toBe(0);
    expect(substract(1, 1)).toBe(0);
    expect(substract(2, 3)).toBe(-1);
    expect(substract(0, -1)).toBe(1);
    expect(substract(-1, -1)).toBe(0);
    expect(substract(-1.5, 0.5)).toBe(-2);
  });

  test("multiples correctly 2 values", () => {
    expect(multiply()).toBe(0);
    expect(multiply(1, 1)).toBe(1);
    expect(multiply(2.5, 2)).toBe(5);
    expect(multiply(0, -1)).toBe(0);
    expect(multiply(-1, -1)).toBe(1);
    expect(multiply(-1.5222222, 5)).toBe(-7.61);
  });

  test("divides correctly 2 values", () => {
    expect(() => divide()).toThrow("You can't divide by 0");
    expect(divide(2, 3)).toBe(0.67);
    expect(divide(0, -1)).toBe(0);
    expect(divide(1, 1)).toBeGreaterThan(0);
    expect(divide(-1, -1)).toBe(1);
    expect(divide(-1.5, 0.5)).toBe(-3);
    expect(() => divide(0, 1)).not.toThrow();
    expect(() => divide(0, 0)).toThrow("You can't divide by 0");
  });
});
