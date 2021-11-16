const {expect} = require("@jest/globals");
const {getMuscle, getIMCLevel, getIMC, getWater} = require("./functions_to_test");

// getIMC tests
describe("getIMC", () => {
	test("weight = 60,   height = 160  --->  IMC = 23.44", () => expect(getIMC(60, 160)).toBe(23.44));
	test("weight = -10,  height = 150  --->  IMC = 0", () => expect(getIMC(-10, 150)).toBe(0));
	test("weight = 700,  height = 100  --->  IMC = 700", () => expect(getIMC(700, 100)).toBe(600));
});

// getMuscle tests
describe("getMuscle", () => {
	test("weight = 70,   height = 160,  sex = m  --->  muscle = 75", () => expect(getMuscle(70, 160, "m")).toBe(75));
	test("weight = 80,   height = 172,  sex = f  --->  muscle = 66.98", () => expect(getMuscle(80, 172, "f")).toBe(66.98));
	test("weight = 600,  height = 150,  sex = m  --->  muscle = 0", () => expect(getMuscle(600, 150, "m")).toBe(0));
	test("weight = 600,  height = 150,  sex = f  --->  muscle = 0", () => expect(getMuscle(600, 150, "f")).toBe(0));
	test("weight = 25,   height = 300,  sex = m  --->  muscle = 100", () => expect(getMuscle(25, 300, "m")).toBe(100));
	test("weight = 25,   height = 300,  sex = f  --->  muscle = 100", () => expect(getMuscle(25, 300, "f")).toBe(100));
});

// getWater tests
describe("getWater", () => {
	test("weight = 60,   height = 160,  age = 30   --->  water = 37.06", () => expect(getWater(60, 160, 30)).toBe(37.06));
	test("weight = 70,   height = 170,  age = 500  --->  water = 0", () => expect(getWater(70, 170, 500)).toBe(0));
	test("weight = 700,  height = 165,  age = 20   --->  water = 250", () => expect(getWater(700, 165, 20)).toBe(250));
});

// getIMCLevel tests
describe("getIMCLevel", () => {
	test("IMC = -15  --->  IMCLevel = -1", () => expect(getIMCLevel(-15)).toBe(-1));
	test("IMC = 17   --->  IMCLevel = 0", () => expect(getIMCLevel(17)).toBe(0));
	test("IMC = 20   --->  IMCLevel = 1", () => expect(getIMCLevel(20)).toBe(1));
	test("IMC = 28   --->  IMCLevel = 2", () => expect(getIMCLevel(28)).toBe(2));
	test("IMC = 31   --->  IMCLevel = 3", () => expect(getIMCLevel(31)).toBe(3));
	test("IMC = 40   --->  IMCLevel = 4", () => expect(getIMCLevel(40)).toBe(4));
});
