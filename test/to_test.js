// Muscle
const getMuscle = (weight, height, sex) => {
	let muscle = 0;

	if (sex === "m") muscle = ((1.1 * weight - 128 * (weight ** 2 / height ** 2)) * 100) / weight;
	else if (sex === "f") muscle = ((1.07 * weight - 148 * (weight ** 2 / height ** 2)) * 100) / weight;

	if (muscle < 0) muscle = 0;

	if (muscle > 100) muscle = 100;

	return parseFloat(muscle.toFixed(2));
};

// IMC classification
const getIMCLevel = (IMC) => {
	let IMCLevel = -1;

	if ((IMC >= 0) & (IMC < 18.5)) IMCLevel = 0;
	else if ((IMC >= 18.5) & (IMC <= 24.9)) IMCLevel = 1;
	else if ((IMC >= 25) & (IMC <= 29.9)) IMCLevel = 2;
	else if ((IMC >= 30) & (IMC <= 34.9)) IMCLevel = 3;
	else if (IMC >= 35) IMCLevel = 4;

	return IMCLevel;
};

// Export functions to test
exports.getMuscle = getMuscle;
exports.getIMCLevel = getIMCLevel;
