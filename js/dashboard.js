let url2 = new URL(window.location.href);
var user = url2.searchParams.get("user");
// console.log(user)

const logoutForm = document.getElementById("sign-out");

const userLogged = (user, cent) => {
    var queryUserLogged = db.collection("info").where("user", "==", user);
    let flag = cent;
    queryUserLogged.get().then((snapshot) => {
        snapshot.forEach((doc) => {
            if (doc.data().online !== true) {
                window.location.replace(
                    window.location.href.slice(
                        0,
                        window.location.href.indexOf(window.location.pathname)
                    )
                );
            }
        });
    });
};

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
                            window.location.href.indexOf("dashboard.html")
                        ) + "signup.html"
                    );
                }
            });
    } catch (error) {
        console.log(error);
    }
};

findUsers(user, true);
userLogged(user, true);

logoutForm.addEventListener("click", async (e) => {
    e.preventDefault();
    await db
        .collection("info")
        .doc(user)
        .update({
            online: false,
        })
        .then(() => {
            console.log("Usuario online!");
        });

    window.location.replace(
        window.location.href.slice(
            0,
            window.location.href.indexOf(window.location.pathname)
        )
    );
});
