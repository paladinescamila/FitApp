let url2 = new URL(window.location.href);
var user = url2.searchParams.get("user");
// console.log(user)

const userLogged = (user, cent) => {
    var queryUserLogged = db.collection("info").where("user", "==", user);
    let flag = cent;
    queryUserLogged.get().then((snapshot) => {
        snapshot.forEach((doc) => {
            if (doc.data().online !== true) {
                console.log(window.location.hostname);
                window.location = window.location.hostname;
            }
        });
    });
};

userLogged(user, true);
