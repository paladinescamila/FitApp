const {expect} = require("@jest/globals");

const getIMC = function (weight, height) {
	let IMC = weight / (height / 100) ** 2;
	IMC = Math.max(IMC, 0);
	IMC = Math.min(IMC, 600);
	return IMC;
};

describe("Verificación de datos", () => {
	test("Debe calcularse un flotante", () => {
		expect(getIMC()).not.toBeNull();
	});
});
