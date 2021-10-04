const drawWeight = (weights, target, month, year) => {
	let weightCtx = document.getElementById("weight-chart").getContext("2d"),
		months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
		labels = [],
		maxValue = Math.max(...weights) + 20;

	for (let i = 0; i < 12; i++) {
		labels.push(`${months[month].slice(0, 3)} ${year}`);
		month++;
		if (month === 12) year++;
		month %= 12;
	}

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
					data: [target, target, target, target, target, target, target, target, target, target, target, target],
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
