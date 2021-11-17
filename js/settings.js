// Open settings window

document.getElementById("go-to-settings").addEventListener("click", (e) => {
	document.getElementById("settings").style.display = "flex";
});

// Close settings window (with "x" button)

document.getElementById("close-settings").addEventListener("click", (e) => {
	document.getElementById("settings").style.display = "none";
});

// Close settings window (clicking outside the box)

document.getElementById("settings").addEventListener("click", (e) => {
	if (!document.getElementById("settings").firstElementChild.contains(e.target)) {
		document.getElementById("close-settings").click();
	}
});

// Save settings to Firebase

document.getElementById("save-settings").addEventListener("click", async (e) => {
	// Get input values
	let newName = nameElement.value,
		newBirth = new Date(birthElement.value),
		newSex = sexElement.value,
		newHeight = parseFloat(heightElement.value),
		oldPass = oldPassElement.value,
		newPass = newPassElement.value,
		newPass2 = newPassElement2.value;

	// Validate the new settings
	let validUpdate = 0;
	newBirth.setDate(newBirth.getDate() + 1);

	if (newName !== "") validUpdate++;
	else alert("Inserte un nombre válido.");

	if (newBirth < new Date()) validUpdate++;
	else alert("Inserte una fecha válida.");

	if (!isNaN(newHeight) && newHeight > 0) {
		if (newHeight >= 100 && newHeight <= 300) validUpdate++;
		else alert("Inserte una estatura entre 100 y 300.");
	} else alert("Inserte una estatura válida.");

	// Update settings
	if (validUpdate == 3) {
		await db
			.collection("info")
			.doc(user)
			.update({
				name: newName,
				birth: firebase.firestore.Timestamp.fromDate(newBirth),
				gender: newSex,
				height: newHeight,
			})
			.then(() => {
				if (oldPass.length !== 0 || newPass.length !== 0 || newPass2.length !== 0) {
					changePassword(oldPass, newPass, newPass2);
				} else {
					drawDashboard(email);
					document.getElementById("settings").style.display = "none";
				}
			});
	}
});

// Change password on Firebase

const changePassword = async (oldPass, newPass, newPass2) => {
	let query = db.collection("users").where("user", "==", user);

	query.get().then((querySnapshot) => {
		querySnapshot.forEach(async (doc) => {
			if (doc.data().pwd === oldPass) {
				if (newPass === newPass2) {
					if (newPass.length >= 8) {
						await db
							.collection("users")
							.doc(user)
							.update({pwd: newPass})
							.then(() => {
								drawDashboard(email);
								document.getElementById("settings").style.display = "none";
							});
					} else {
						alert("La contraseña debe tener 8 caracteres o más.");
					}
				} else {
					alert("Las contraseñas no coinciden.");
				}
			} else {
				alert("La contraseña anterior no es correcta.");
			}
		});
	});
};

// Update weight and date

const updateWeightDate = (user, dateToFind, newWeight, cent) => {
	var queryFindDate = db.collection("info").where("user", "==", user);
	let flag = cent;
	queryFindDate.get().then((snapshot) => {
		snapshot.forEach(async (doc) => {
			if (flag) {
				let weights = doc.data().weights;

				weights = weights.map((element) => {
					return {
						date: element.date.toDate(),
						weight: element.weight,
					};
				});

				// weights = weights.sort((a, b) => a.date - b.date);

				//Buscamos el objeto que tenga la fecha del último registro del mismo día
				let objectDate = weights.find(
					(element) => element.date.getFullYear() === dateToFind.getFullYear() && element.date.getMonth() === dateToFind.getMonth() && element.date.getDate() === dateToFind.getDate() + 1
				);
				let newDate = new Date(dateToFind);
				newDate = new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate() + 1); //Revisar si todo ese manejo de días (tantos +1) afecta la fecha real del pesaje

				//Construimos el objeto con el timestamp a remover

				if (objectDate === undefined) {
					newDate = firebase.firestore.Timestamp.fromDate(newDate);
					await db
						.collection("info")
						.doc(user)
						.update({
							weights: firebase.firestore.FieldValue.arrayUnion({
								date: newDate,
								weight: newWeight,
							}),
						});
				} else {
					//Construimos el objeto con el timestamp a remover
					objectDate.date = firebase.firestore.Timestamp.fromDate(newDate);

					await db
						.collection("info")
						.doc(user)
						.update({
							weights: firebase.firestore.FieldValue.arrayRemove(objectDate),
						});

					await new Promise((r) => setTimeout(r, 1500));

					await db
						.collection("info")
						.doc(user)
						.update({
							weights: firebase.firestore.FieldValue.arrayUnion({
								date: objectDate.date,
								weight: newWeight,
							}),
						});

					await new Promise((r) => setTimeout(r, 1500));
				}
				drawDashboard(email);
				document.getElementById("add-weight").style.display = "none";
				flag = false;
			}
		});
	});
};

// Open add weight window

document.getElementById("go-to-add-weight").addEventListener("click", (e) => {
	document.getElementById("add-weight").style.display = "flex";
});

// Close add weight window (with "x" button)

document.getElementById("close-add-weight").addEventListener("click", (e) => {
	document.getElementById("add-weight").style.display = "none";
});

// Close add weight window (clicking outside the box)

document.getElementById("add-weight").addEventListener("click", (e) => {
	if (!document.getElementById("add-weight").firstElementChild.contains(e.target)) {
		document.getElementById("close-add-weight").click();
	}
});

// Save weight to Firebase

document.getElementById("save-weight").addEventListener("click", async (e) => {
	let newDate = new Date(document.getElementById("date").value),
		newWeight = parseFloat(weight.value),
		validUpdate = 0;

	if (newDate <= new Date()) validUpdate++;
	else alert("Ingrese una fecha válida.");

	if (!isNaN(newWeight)) {
		if (newWeight >= 25 && newWeight <= 600) validUpdate++;
		else alert("Inserte un peso entre 25 y 600.");
	} else alert("Inserte un peso válido.");

	if (validUpdate == 2) updateWeightDate(user, newDate, newWeight, true);
});

// Save weight pressing ENTER on the weight input

document.getElementById("weight").addEventListener("keyup", (e) => {
	if (e.keyCode === 13) {
		event.preventDefault();
		document.getElementById("save-weight").click();
	}
});
