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
