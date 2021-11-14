// IMC
const getIMC = (weight, height) => {
	let IMC = weight / (height / 100) ** 2;
	IMC = Math.max(IMC, 0);
	IMC = Math.min(IMC, 600);
	return IMC;
};

// Muscle
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
	let IMCLevel = -1;

	if ((IMC >= 0) & (IMC < 18.5)) IMCLevel = 0;
	else if ((IMC >= 18.5) & (IMC < 25)) IMCLevel = 1;
	else if ((IMC >= 25) & (IMC < 30)) IMCLevel = 2;
	else if ((IMC >= 30) & (IMC < 35)) IMCLevel = 3;
	else if (IMC >= 35) IMCLevel = 4;

	return IMCLevel;
};

// Two digit formatter
const format = (n) => (n < 10 ? "0" + n : n);
