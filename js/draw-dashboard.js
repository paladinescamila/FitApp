let url = new URL(window.location.href);
var email = url.searchParams.get("user");
// console.log(user)

if (email === null) {
	window.location.replace(window.location.href.slice(0, window.location.href.indexOf("dashboard.html")) + "signup.html");
}

// Banner components
let nameElement = document.getElementById("name"),
	emailElement = document.getElementById("email"),
	birthElement = document.getElementById("birth"),
	sexElement = document.getElementById("sex"),
	heightElement = document.getElementById("height"),
	weightElement = document.getElementById("weight");

// Grid components
let weightCardElement = document.getElementById("weight-card"),
	targetWeightElement = document.getElementById("target-weight"),
	imcCardElement = document.getElementById("imc-card"),
	imcLevelElement = document.getElementById("imc-level"),
	muscleElement = document.getElementById("muscle"),
	waterElement = document.getElementById("water");

// IMC level styles
const IMCLevelNames = ["Bajo peso", "Normal", "Sobrepeso", "Obeso", "Extremo obeso"],
	IMCLevelColors = ["#0274d1", "#02d11e", "#d1b902", "#d15c02", "#d10202"];

const drawDashboard = async (email) => {
	// Data from Firebase
	var queryDataUser = await db.collection("info").where("user", "==", email);
	queryDataUser.get().then((querySnapshot) => {
		querySnapshot.forEach((doc) => {
			let name = doc.data().name,
				birth = doc.data().birth.toDate(),
				sex = doc.data().gender,
				height = doc.data().height,
				weights = doc.data().weights;

			weights = weights.map((element) => {
				return {
					date: element.date.toDate(),
					weight: element.weight,
				};
			});

			weights = weights.sort((a, b) => a.date - b.date);

			// Birth data
			let birthDate = `${birth.getFullYear()}-${format(birth.getMonth() + 1)}-${format(birth.getDate())}`,
				age = Math.floor((new Date() - birth) * 3.2 * 10 ** -11);

			// Weight data
			let dates = weights.map((wd) => wd.date);
			weights = weights.map((wd) => wd.weight);
			let nWeight = weights.length,
				weight = weights[nWeight - 1],
				targetWeight = 25 * (height / 100) ** 2;

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
			weightElement.value = weight;

			// Paint data in the grid
			weightCardElement.innerHTML = weight + "Kg";
			targetWeightElement.innerHTML = "Peso objetivo: " + Math.floor(targetWeight) + "Kg";
			imcCardElement.innerHTML = IMC.toFixed(2);
			imcCardElement.style.color = IMCLevelColors[IMCLevel];
			imcLevelElement.innerHTML = IMCLevelNames[IMCLevel];
			muscleElement.innerHTML = muscle.toFixed(0) + "%";
			waterElement.innerHTML = water.toFixed(0) + "%";

			// Paint charts
			drawWeight(dates, weights, targetWeight);
			drawIMC(dates, IMCs, targetIMC);
			drawMuscleAndWater(dates, muscles, waters);
		});
	});
};

drawDashboard(email);

birthElement.addEventListener("change", async (e) => {
	await new Promise((r) => setTimeout(r, 3000));
	newBirth = new Date(birthElement.value);
	newBirth = new Date(newBirth.getFullYear(), newBirth.getMonth(), newBirth.getDate() + 1);
	if (newBirth < new Date()) {
		await db
			.collection("info")
			.doc(user)
			.update({
				birth: firebase.firestore.Timestamp.fromDate(newBirth),
			})
			.then(() => {
				console.log("Fecha de nacimiento actualizada!");
				window.location.reload();
			});
	} else {
		alert("Inserte una fecha válida");
	}
});

sexElement.addEventListener("change", async (e) => {
	newSex = sexElement.value;
	await db
		.collection("info")
		.doc(user)
		.update({
			gender: newSex,
		})
		.then(() => {
			console.log("Género actualizado!");
			window.location.reload();
		});
});

weightElement.addEventListener("change", async (e) => {
	await new Promise((r) => setTimeout(r, 2000));
	newWeight = parseFloat(weightElement.value);
	if (isNaN(newWeight) !== true && newWeight > 0) {
		await db
			.collection("info")
			.doc(user)
			.update({
				weights: firebase.firestore.FieldValue.arrayUnion({
					date: firebase.firestore.Timestamp.fromDate(new Date()),
					weight: newWeight,
				}),
			})
			.then(() => {
				console.log("Peso actualizado!");
				window.location.reload();
			});
	} else {
		alert("Ingrese un peso válido");
	}
});

heightElement.addEventListener("change", async (e) => {
	await new Promise((r) => setTimeout(r, 2000));
	newHeight = parseFloat(heightElement.value);
	if (isNaN(newHeight) !== true && newHeight > 0) {
		await db
			.collection("info")
			.doc(user)
			.update({
				height: newHeight,
			})
			.then(() => {
				console.log("Estatura actualizado!");
				window.location.reload();
			});
	} else {
		alert("Ingrese un peso válido");
	}
});
