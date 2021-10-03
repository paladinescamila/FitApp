const drawMuscle = (muscle, month, year) => {
	let muscleCtx = document.getElementById("muscle-chart").getContext("2d"),
		months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
		labels = [],
		maxValue = Math.max(...muscle) + 10;

	for (let i = 0; i < 12; i++) {
		month = (month + 1) % 12;
		labels.push(`${months[month].slice(0, 3)} ${year}`);
		if (month === 11) year++;
	}

	return new Chart(muscleCtx, {
		type: "line",
		data: {
			labels: labels,
			datasets: [
				{
					type: "line",
					label: "% de masa muscular",
					data: muscle,
					backgroundColor: "rgba(73, 18, 150, 0.3)",
					borderColor: "rgb(73, 18, 150)",
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

height = 1.62;
weighs = [80, 78, 75, 70, 74];
IMC = weighs.map((w) => w / (height * height));

drawMuscle(IMC, 6, 2021);
