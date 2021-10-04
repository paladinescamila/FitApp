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
