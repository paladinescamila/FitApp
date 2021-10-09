let url = new URL(window.location.href);
var user = url.searchParams.get("user");
// console.log(user)

if (user === null) {
	window.location.replace(window.location.href.slice(0, window.location.href.indexOf("form.html")) + "signup.html");
}

const findUsers = async (user, cent) => {
	let flag = cent;
	const collectionRef = db.collection("users");
	try {
		const response = await collectionRef.where("user", "==", user).onSnapshot((snapshot) => {
			if (snapshot.docs.length === 0 && flag) {
				flag = false;
				window.location.replace(window.location.href.slice(0, window.location.href.indexOf("form.html")) + "signup.html");
			}
		});
	} catch (error) {
		console.log(error);
	}
};

const isFilledBirth = (user, cent) => {
	var queryUserBirth = db.collection("info").where("user", "==", user);
	let flag = cent;
	queryUserBirth.get().then((snapshot) => {
		snapshot.forEach((doc) => {
			if (doc.data().birth !== undefined) {
				window.location.replace(window.location.href.slice(0, window.location.href.indexOf("form.html")) + "signup.html");
			}
		});
	});
};

findUsers(user, true);
isFilledBirth(user, true);

const saveForm = document.getElementById("save");

const updateUserInfo = async (user, weight, height, gender, birth) => {
	birth = new Date(birth);
	birth = new Date(birth.getFullYear(), birth.getMonth(), birth.getDate() + 1);
	birth = firebase.firestore.Timestamp.fromDate(birth);

	let date = new Date();
	date = new Date(date.getFullYear(), date.getMonth(), date.getDate());
	// console.log(birth);
	await db
		.collection("info")
		.doc(user)
		.update({
			height: height,
			gender: gender,
			birth: birth,
			weights: [
				{
					date: firebase.firestore.Timestamp.fromDate(date),
					weight: weight,
				},
			],
			online: true,
		})
		.then(() => {
			console.log("Listos los datos del usuario!");
		});
};

saveForm.addEventListener("click", async (e) => {
	e.preventDefault();
	var weight = document.getElementById("weight").value;
	var height = document.getElementById("height").value;
	const gender = document.getElementById("gender").value;
	const birth = document.getElementById("birth").value; //string
	// console.log(birth)

	if (weight != "" && height != "" && gender != "n" && birth != "") {
		weight = parseFloat(weight);
		height = parseFloat(height);
		if (isNaN(weight) || isNaN(height)) {
			alert("El peso y estatura deben ser números.");
		} else if (weight < 0 || height < 0) {
			alert("El peso y la estatura deben ser mayores que 0.");
		} else if (weight < 25 || weight > 600) {
			alert("El peso debe estar entre 25 y 600.");
		} else if (height < 100 || height > 300) {
			alert("La estatura debe estar entre 100 y 300.");
		} else {
			//Guardar datos en la colección info del usuario registrado
			console.log("Entramos!");
			updateUserInfo(user, weight, height, gender, birth);
			//Esperar a que se escriban los datos del usuario
			await new Promise((r) => setTimeout(r, 1000));
			//Pasar al dashboard
			window.location.replace(window.location.href.slice(0, window.location.href.indexOf("form.html")) + "dashboard.html?user=" + user);
		}
	} else {
		alert("Por favor, llena todos los campos.");
	}
});
