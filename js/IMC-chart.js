const drawIMC = (IMC, target, month, year) => {
	let IMCctx = document.getElementById("IMC-chart").getContext("2d"),
		months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
		labels = [],
		maxValue = Math.max(...IMC) + 10;

	for (let i = 0; i < 12; i++) {
		month = (month + 1) % 12;
		labels.push(`${months[month].slice(0, 3)} ${year}`);
		if (month === 11) year++;
	}

	return new Chart(IMCctx, {
		type: "line",
		data: {
			labels: labels,
			datasets: [
				{
					type: "line",
					label: "IMC",
					data: IMC,
					backgroundColor: "rgba(176, 28, 5, 0.3)",
					borderColor: "rgb(176, 28, 5)",
					borderWidth: 1,
				},
				{
					type: "line",
					label: "IMC objetivo",
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

let height = 1.62,
	weighs = [80, 78, 75, 70, 74],
	IMC = weighs.map((w) => w / (height * height));

drawIMC(IMC, 24.9, 6, 2021);
