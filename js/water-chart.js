const drawWater = (water, target, month, year) => {
	let waterCtx = document.getElementById("water-chart").getContext("2d"),
		months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
		labels = [],
		maxValue = Math.max(...water) + 10;

	for (let i = 0; i < 12; i++) {
		month = (month + 1) % 12;
		labels.push(`${months[month].slice(0, 3)} ${year}`);
		if (month === 11) year++;
	}

	return new Chart(waterCtx, {
		type: "line",
		data: {
			labels: labels,
			datasets: [
				{
					type: "line",
					label: "% de agua",
					data: water,
					backgroundColor: "rgba(18, 99, 150, 0.3)",
					borderColor: "rgb(18, 99, 150)",
					borderWidth: 1,
				},
				{
					type: "line",
					label: "% de agua objetivo",
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

height = 1.62;
weighs = [80, 78, 75, 70, 74];
IMC = weighs.map((w) => w / (height * height));

drawWater(IMC, 24.9, 6, 2021);
