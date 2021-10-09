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
            alert("El peso y estatura deben ser números.");
        } else if (weight < 0 || height < 0) {
            alert("El peso y la estatura deben ser mayores que 0.");
        } else {
            //Guardar datos en la colección info del usuario registrado
            console.log("Entramos!");
            updateUserInfo(user, weight, height, gender, birth);
            //Esperar a que se escriban los datos del usuario
            await new Promise((r) => setTimeout(r, 1000));
            //Pasar al dashboard
            window.location.replace(window.location.href.slice(0, window.location.href.indexOf(window.location.pathname)));
        }
    } else {
        alert("Por favor, llena todos los campos.");
    }
});

const updateWeightDate = (user, dateToFind, newWeight, cent) => {
    var queryFindDate = db.collection("info").where("user", "==", user);
    let flag = cent;
    queryFindDate.get().then((snapshot) => {
        snapshot.forEach(async (doc) => {
            let weights = doc.data().weights;

            weights = weights.map((element) => {
                return {
                    date: element.date.toDate(),
                    weight: element.weight,
                };
            });

            // weights = weights.sort((a, b) => a.date - b.date);

            //Buscamos el objeto que tenga la fecha del último registro del mismo día
            let objectDate = weights.find((element) => element.date === dateToFind);
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

                await db
                    .collection("info")
                    .doc(user)
                    .update({
                        weights: firebase.firestore.FieldValue.arrayUnion({
                            date: objectDate.date,
                            weight: newWeight,
                        }),
                    });
            }
        });
    });
};
