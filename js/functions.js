// IMC
const getIMC = (weight, height) => {
	let IMC = weight / (height / 100) ** 2;
	IMC = Math.max(IMC, 0);
	IMC = Math.min(IMC, 600);
	return IMC;
};

// Músculo
const getMuscle = (weight, height, sex) => {
	let muscle = -1;
	if (sex === "m") muscle = ((1.1 * weight - 128 * (weight ** 2 / height ** 2)) * 100) / weight;
	else if (sex === "f") muscle = ((1.07 * weight - 148 * (weight ** 2 / height ** 2)) * 100) / weight;

	muscle = Math.max(muscle, 0);
	muscle = Math.min(muscle, 150);
	return muscle;
};

// Water
const getWater = (weight, height, age) => {
	let water = 2.447 - 0.09156 * age + 0.1074 * height + 0.3362 * weight;
	water = Math.max(water, 0);
	water = Math.min(water, 250);
	return water;
};

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
