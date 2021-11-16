// IMC
const getIMC = (weight, height) => {
	let IMC = weight / (height / 100) ** 2;

	if (IMC < 0) IMC = 0;
	if (IMC > 600) IMC = 600;

	return parseFloat(IMC.toFixed(2));
};

// Muscle
const getMuscle = (weight, height, sex) => {
	let muscle = 0;

	if (sex === "m") muscle = ((1.1 * weight - 128 * (weight ** 2 / height ** 2)) * 100) / weight;
	else muscle = ((1.07 * weight - 148 * (weight ** 2 / height ** 2)) * 100) / weight;

	if (muscle < 0) muscle = 0;
	if (muscle > 100) muscle = 100;

	return parseFloat(muscle.toFixed(2));
};

// Water
const getWater = (weight, height, age) => {
	let water = 2.447 - 0.09156 * age + 0.1074 * height + 0.3362 * weight;

	if (water < 0) water = 0;
	if (water > 250) water = 250;

	return parseFloat(water.toFixed(2));
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

// Export functions to test
exports.getIMC = getIMC;
exports.getMuscle = getMuscle;
exports.getWater = getWater;
exports.getIMCLevel = getIMCLevel;
