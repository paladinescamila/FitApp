// Weight chart ////////////////////////////////////////////////////////////////////////////////////////////

const drawWeight = (dates, weights, target) => {
	let n = dates.length,
		startIndex = n <= 10 ? 0 : n - 10;
	dates = dates.slice(startIndex, n + 1);
	weights = weights.slice(startIndex, n + 1);

	let weightCtx = document.getElementById("weight-chart").getContext("2d"),
		labels = dates.map((d) => `${format(d.getDate())}-${format(d.getMonth() + 1)}-${d.getFullYear()}`),
		maxValue = Math.max(...weights) + 20;

	return new Chart(weightCtx, {
		type: "line",
		data: {
			labels: labels,
			datasets: [
				{
					type: "line",
					label: "Peso (Kg)",
					data: weights,
					backgroundColor: "rgba(255, 132, 0, 0.3)",
					borderColor: "rgb(255, 132, 0)",
					borderWidth: 1,
				},
				{
					type: "line",
					label: "Peso objetivo (Kg)",
					data: dates.map((d) => target),
					fill: false,
					borderColor: "rgb(0, 0, 0)",
					borderWidth: 1,
				},
			],
		},
		options: {
			scales: {
				yAxes: [{ticks: {beginAtZero: true, max: maxValue}}],
			},
		},
	});
};

// IMC chart ///////////////////////////////////////////////////////////////////////////////////////////////

const drawIMC = (dates, IMCs, target) => {
	let n = dates.length,
		startIndex = n <= 10 ? 0 : n - 10;
	dates = dates.slice(startIndex, n + 1);
	IMCs = IMCs.slice(startIndex, n + 1);

	let IMCctx = document.getElementById("IMC-chart").getContext("2d"),
		labels = dates.map((d) => `${format(d.getDate())}-${format(d.getMonth() + 1)}-${d.getFullYear()}`),
		maxValue = Math.max(...IMCs) + 10;

	return new Chart(IMCctx, {
		type: "line",
		data: {
			labels: labels,
			datasets: [
				{
					type: "line",
					label: "IMC",
					data: IMCs,
					backgroundColor: "rgba(176, 28, 5, 0.3)",
					borderColor: "rgb(176, 28, 5)",
					borderWidth: 1,
				},
				{
					type: "line",
					label: "IMC objetivo",
					data: dates.map((d) => target),
					fill: false,
					borderColor: "rgb(0, 0, 0)",
					borderWidth: 1,
				},
			],
		},
		options: {
			scales: {
				yAxes: [{ticks: {beginAtZero: true, max: maxValue}}],
			},
		},
	});
};

// Muscle and water chart //////////////////////////////////////////////////////////////////////////////////

const drawMuscleAndWater = (dates, muscles, waters) => {
	let n = dates.length,
		startIndex = n <= 10 ? 0 : n - 10;
	dates = dates.slice(startIndex, n + 1);
	muscles = muscles.slice(startIndex, n + 1);
	waters = waters.slice(startIndex, n + 1);

	let muscleWaterCtx = document.getElementById("muscle-water-chart").getContext("2d"),
		labels = dates.map((d) => `${format(d.getDate())}-${format(d.getMonth() + 1)}-${d.getFullYear()}`);

	return new Chart(muscleWaterCtx, {
		type: "line",
		data: {
			labels: labels,
			datasets: [
				{
					type: "line",
					label: "% masa muscular",
					data: muscles,
					backgroundColor: "rgba(73, 18, 150, 0.3)",
					borderColor: "rgb(73, 18, 150)",
					borderWidth: 1,
				},
				{
					type: "line",
					label: "% agua",
					data: waters,
					backgroundColor: "rgba(18, 99, 150, 0.3)",
					borderColor: "rgb(18, 99, 150)",
					borderWidth: 1,
				},
			],
		},
		options: {
			scales: {
				yAxes: [{ticks: {beginAtZero: true, max: 100}}],
			},
		},
	});
};
