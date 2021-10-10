const {expect} = require("@jest/globals");
const {getMuscle, getIMCLevel} = require("./to_test");

// getMuscle tests
describe("getMuscle", () => {
	test("w = 70,\th = 160,  s = m\t---> 75", () => expect(getMuscle(70, 160, "m")).toBe(75));
	test("w = 80,\th = 172,  s = f\t---> 66.98", () => expect(getMuscle(80, 172, "f")).toBe(66.98));
	test("w = 600,\th = 150,  s = m\t---> 0", () => expect(getMuscle(600, 150, "m")).toBe(0));
	test("w = 600,\th = 150,  s = f\t---> 0", () => expect(getMuscle(600, 150, "f")).toBe(0));
	test("w = 25,\th = 300,  s = m\t---> 0", () => expect(getMuscle(25, 300, "m")).toBe(100));
	test("w = 25,\th = 300,  s = f\t---> 0", () => expect(getMuscle(25, 300, "f")).toBe(100));
});

// getIMCLevel tests
describe("getIMCLevel", () => {
	test("IMC = -15\t---> -1", () => expect(getIMCLevel(-15)).toBe(-1));
	test("IMC = 17\t---> 0", () => expect(getIMCLevel(17)).toBe(0));
	test("IMC = 20\t---> 1", () => expect(getIMCLevel(20)).toBe(1));
	test("IMC = 28\t---> 2", () => expect(getIMCLevel(28)).toBe(2));
	test("IMC = 31\t---> 3", () => expect(getIMCLevel(31)).toBe(3));
	test("IMC = 40\t---> 4", () => expect(getIMCLevel(40)).toBe(4));
});
