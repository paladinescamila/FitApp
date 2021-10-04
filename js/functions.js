// IMC
const getIMC = (weight, height) => weight / (height / 100) ** 2;

// Músculo
const getMuscle = (weight, height, sex) => {
	if (sex === "m") {
		return ((1.1 * weight - 128 * (weight ** 2 / height ** 2)) * 100) / weight;
	} else if (sex === "f") {
		return ((1.07 * weight - 148 * (weight ** 2 / height ** 2)) * 100) / weight;
	} else {
		return -1;
	}
};

// Water
const getWater = (weight, height, age) => 2.447 - 0.09156 * age + 0.1074 * height + 0.3362 * weight;

// IMC classification
const getIMCLevel = (IMC) => {
	if ((IMC >= 0) & (IMC < 18.5)) return 0;
	else if ((IMC >= 18.5) & (IMC <= 24.9)) return 1;
	else if ((IMC >= 25) & (IMC <= 29.9)) return 2;
	else if ((IMC >= 30) & (IMC <= 34.9)) return 3;
	else if (IMC >= 35) return 4;
	else return -1;
};

// Two digit formatter
const format = (n) => (n < 10 ? "0" + n : n);
