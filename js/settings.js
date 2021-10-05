// Open settings window

document.getElementById("go-to-settings").addEventListener("click", (e) => {
	document.getElementById("settings").style.display = "flex";
});

// Close settings window

document.getElementById("close-settings").addEventListener("click", (e) => {
	document.getElementById("settings").style.display = "none";
	drawDashboard(email);
});

// Save settings to Firebase

document.getElementById("save-settings").addEventListener("click", async (e) => {
	let newName = nameElement.value,
		newBirth = new Date(birthElement.value),
		newSex = sexElement.value,
		newWeight = parseFloat(weightElement.value),
		newHeight = parseFloat(heightElement.value);

	let validUpdate = 0;
	newBirth.setDate(newBirth.getDate() + 1);

	if (newName !== "") validUpdate++;
	else alert("Inserte un nombre válido.");

	if (newBirth < new Date()) validUpdate++;
	else alert("Inserte una fecha válida.");

	if (!isNaN(newHeight) && newHeight > 0) validUpdate++;
	else alert("Inserte una estatura válida.");

	if (!isNaN(newWeight) && newWeight > 0) validUpdate++;
	else alert("Inserte un peso válido.");

	if (validUpdate == 4) {
		await db
			.collection("info")
			.doc(user)
			.update({
				name: newName,
				birth: firebase.firestore.Timestamp.fromDate(newBirth),
				gender: newSex,
				height: newHeight,
				weights: firebase.firestore.FieldValue.arrayUnion({
					date: firebase.firestore.Timestamp.fromDate(new Date()),
					weight: newWeight,
				}),
			})
			.then(() => {
				drawDashboard(email);
				document.getElementById("settings").style.display = "none";
			});
	}
});
