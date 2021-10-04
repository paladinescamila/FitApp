let url = new URL(window.location.href);
var user = url.searchParams.get("user");
// console.log(user)

if (user === null) {
    window.location.replace(
        window.location.href.slice(
            0,
            window.location.href.indexOf("form.html")
        ) + "signup.html"
    );
}

const findUsers = async (user, cent) => {
    let flag = cent;
    const collectionRef = db.collection("users");
    try {
        const response = await collectionRef
            .where("user", "==", user)
            .onSnapshot((snapshot) => {
                if (snapshot.docs.length === 0 && flag) {
                    flag = false;
                    window.location.replace(
                        window.location.href.slice(
                            0,
                            window.location.href.indexOf("form.html")
                        ) + "signup.html"
                    );
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
                window.location.replace(
                    window.location.href.slice(
                        0,
                        window.location.href.indexOf("form.html")
                    ) + "signup.html"
                );
            }
        });
    });
};

findUsers(user, true);
isFilledBirth(user, true);

const saveForm = document.getElementById("save");

const updateUserInfo = async (user, weight, height, gender, birth) => {
    let date = firebase.firestore.FieldValue.serverTimestamp();
    await db
        .collection("info")
        .doc(user)
        .update({
            height: height,
            gender: gender,
            birth: firebase.firestore.Timestamp.fromDate(new Date(birth)),
            weights: [
                {
                    date: firebase.firestore.Timestamp.fromDate(new Date()),
                    weight: weight,
                },
            ],
            online: false,
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
            alert("El peso y estatura deben ser números!");
        } else if (weight < 0 || height < 0) {
            alert("El peso y la estatura deben ser mayores que 0!");
        } else {
            //Guardar datos en la colección info del usuario registrado
            console.log("Entramos!");
            updateUserInfo(user, weight, height, gender, birth);
            //Esperar a que se escriban los datos del usuario
            await new Promise((r) => setTimeout(r, 1000));
            //Pasar al dashboard
            window.location.replace(window.location.hostname);
        }
    } else {
        alert("Por favor, llena todos los campos!");
    }
});
