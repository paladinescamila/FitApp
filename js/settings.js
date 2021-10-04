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
