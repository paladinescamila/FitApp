// Banner components
let nameElement = document.getElementById("name"),
	emailElement = document.getElementById("email"),
	birthElement = document.getElementById("birth"),
	sexElement = document.getElementById("sex"),
	heightElement = document.getElementById("height");

// Grid components
let weightCardElement = document.getElementById("weight-card"),
	targetWeightElement = document.getElementById("target-weight"),
	imcCardElement = document.getElementById("imc-card"),
	imcLevelElement = document.getElementById("imc-level"),
	muscleElement = document.getElementById("muscle"),
	waterElement = document.getElementById("water");

// Digit formatter
const format = (n) => (n < 10 ? "0" + n : n),
	IMCLevelNames = ["Bajo peso", "Normal", "Sobrepeso", "Obeso", "Extremo obeso"],
	IMCLevelColors = ["#0274d1", "#02d11e", "#d1b902", "#d15c02", "#d10202"];

const drawDashboard = (email) => {
	// Data from Firebase
	let name = "Juanito Pérez",
		birth = new Date(2000, 3, 10),
		sex = "m",
		height = 162,
		weights = [
			{date: new Date(2021, 6, 1), weight: 80},
			{date: new Date(2021, 7, 1), weight: 78},
			{date: new Date(2021, 8, 1), weight: 75},
			{date: new Date(2021, 9, 1), weight: 70},
			{date: new Date(2021, 10, 1), weight: 74},
			{date: new Date(2021, 11, 1), weight: 75},
			{date: new Date(2022, 0, 1), weight: 76},
			{date: new Date(2022, 1, 1), weight: 81},
			{date: new Date(2022, 2, 1), weight: 78},
			{date: new Date(2022, 3, 1), weight: 79},
			{date: new Date(2022, 4, 1), weight: 80},
			{date: new Date(2022, 5, 1), weight: 79},
			{date: new Date(2022, 6, 1), weight: 78},
			{date: new Date(2022, 7, 1), weight: 77},
			{date: new Date(2022, 8, 1), weight: 76},
		];

	// Birth data
	let birthDate = `${birth.getFullYear()}-${format(birth.getMonth() + 1)}-${birth.getDate()}`,
		age = Math.floor((new Date() - birth) * 3.2 * 10 ** -11);

	// Weight data
	let dates = weights.map((wd) => wd.date);
	weights = weights.map((wd) => wd.weight);
	let nWeight = weights.length,
		weight = weights[nWeight - 1],
		targetWeight = 25 * (height / 100) ** 2,
		startIndex = nWeight <= 12 ? 0 : nWeight - 12,
		startMonth = dates[startIndex].getMonth(),
		startYear = dates[startIndex].getFullYear();

	// IMC data
	let IMCs = weights.map((w) => getIMC(w, height)),
		IMC = IMCs[nWeight - 1],
		targetIMC = 25,
		IMCLevel = getIMCLevel(IMC);

	// Muscle data
	let muscles = weights.map((w) => getMuscle(w, height, sex)),
		muscle = muscles[nWeight - 1];

	// Water data
	let waters = weights.map((w) => getWater(w, height, age)),
		water = waters[nWeight - 1];

	// Paint data in the dashboard banner
	nameElement.innerHTML = name;
	emailElement.innerHTML = email;
	birthElement.value = birthDate;
	sexElement.value = sex;
	heightElement.value = height;

	// Paint data in the grid
	weightCardElement.innerHTML = weight + "Kg";
	targetWeightElement.innerHTML = "Peso objetivo: " + Math.floor(targetWeight) + "Kg";
	imcCardElement.innerHTML = IMC.toFixed(2);
	imcCardElement.style.color = IMCLevelColors[IMCLevel];
	imcLevelElement.innerHTML = IMCLevelNames[IMCLevel];
	muscleElement.innerHTML = muscle.toFixed(0) + "%";
	waterElement.innerHTML = water.toFixed(0) + "%";

	// Paint charts
	drawWeight(weights.slice(startIndex, nWeight + 1), targetWeight, startMonth, startYear);
	drawIMC(IMCs.slice(startIndex, nWeight + 1), targetIMC, startMonth, startYear);
	drawMuscleAndWater(muscles.slice(startIndex, nWeight + 1), waters.slice(startIndex, nWeight + 1), startMonth, startYear);
};

drawDashboard("hola@nose.com");
