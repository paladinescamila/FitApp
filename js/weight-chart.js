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
