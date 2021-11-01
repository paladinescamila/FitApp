const {expect} = require("@jest/globals");
const {getMuscle, getIMCLevel, getIMC, getWater} = require("./to_test");

// getIMC tests
describe("getIMC", () => {
	test("w = 60,\th = 160\t---> 23.44", () => expect(getIMC(60, 160)).toBe(23.44));
	test("w = -10,\th = 150\t---> 0", () => expect(getIMC(-10, 150)).toBe(0));
	test("w = 700,\th = 100\t---> 700", () => expect(getIMC(700, 100)).toBe(600));
});

// getMuscle tests
describe("getMuscle", () => {
	test("w = 70,\th = 160,  s = m\t---> 75", () => expect(getMuscle(70, 160, "m")).toBe(75));
	test("w = 80,\th = 172,  s = f\t---> 66.98", () => expect(getMuscle(80, 172, "f")).toBe(66.98));
	test("w = 600,\th = 150,  s = m\t---> 0", () => expect(getMuscle(600, 150, "m")).toBe(0));
	test("w = 600,\th = 150,  s = f\t---> 0", () => expect(getMuscle(600, 150, "f")).toBe(0));
	test("w = 25,\th = 300,  s = m\t---> 100", () => expect(getMuscle(25, 300, "m")).toBe(100));
	test("w = 25,\th = 300,  s = f\t---> 100", () => expect(getMuscle(25, 300, "f")).toBe(100));
});

// getWater tests
describe("getWater", () => {
	test("w = 60,\th = 160,  a = 30  ---> 37.06", () => expect(getWater(60, 160, 30)).toBe(37.06));
	test("w = 70,\th = 170,  a = 500 ---> 0", () => expect(getWater(70, 170, 500)).toBe(0));
	test("w = 700,\th = 165,  a = 20  ---> 250", () => expect(getWater(700, 165, 20)).toBe(250));
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
