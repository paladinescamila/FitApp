// Open settings window

document.getElementById("go-to-settings").addEventListener("click", (e) => {
	document.getElementById("settings").style.display = "flex";
});

// Close settings window

document.getElementById("close-settings").addEventListener("click", (e) => {
	drawDashboard(email);
	document.getElementById("settings").style.display = "none";
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

// Open add weight window

document.getElementById("go-to-add-weight").addEventListener("click", (e) => {
	document.getElementById("add-weight").style.display = "flex";
});

// Close add weight window

document.getElementById("close-add-weight").addEventListener("click", (e) => {
	drawDashboard(email);
	document.getElementById("add-weight").style.display = "none";
});

// Save weight to Firebase

document.getElementById("save-weight").addEventListener("click", async (e) => {
	let newDate = document.getElementById("date").value,
		newWeight = parseFloat(weight.value),
		validUpdate = 0;

	if (newDate <= new Date()) validUpdate++;
	else alert("Ingrese una fecha válida");

	if (!isNaN(newWeight) && newWeight > 0) {
		if (newWeight >= 25 && newWeight <= 600) validUpdate++;
		else alert("Inserte un peso entre 25 y 600.");
	} else alert("Inserte un peso válido.");

	// if (validUpdate == 2)
	// drawDashboard(email);
	// document.getElementById("add-weight").style.display = "none";
});
