const loginForm = document.getElementById("login");

const searchUser = (user, pwd, cent) => {
    let flag = cent;
    var q = db.collection("users").where("user", "==", user)
    q.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            if(doc.data().pwd != pwd && flag){
                alert("Usuario o contraseña incorrectos, por favor, intente de nuevo")
                // document.getElementById("user").value = ""
                // document.getElementById("password").value = ""
                flag = false;
            } else if(doc.data().pwd === pwd && flag) {
                //pinteme el dashboard
                window.location.replace(window.location.href.slice(0,window.location.href.indexOf("index.html"))+"/pages/dashboard.html?user="+user)
                console.log("Entramos!");
                flag = false;
            }
        })
    })
}


const findUserLogin = (user,pwd) => {
    const collectionRef = db.collection("users")
    try{
        const response = collectionRef.where('user', '==', user).onSnapshot(snapshot => {
            if (snapshot.docs.length === 0){
                alert("El usuario no se encuentra creado, por favor, registrese!")
            } else {
                searchUser(user,pwd, true);
            }
        })
    } catch (error){
        console.log(error)
    }
}


function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

loginForm.addEventListener("click", async(e) =>{
    e.preventDefault();
    const user = document.getElementById("user").value;
    const pwd = document.getElementById("password").value;

    if(user != "" && pwd != ""){
        if(validateEmail(user)){
            searchUser(user, pwd)
            await findUserLogin(user.toLowerCase(),pwd);  
        } else {
            alert("El texto ingresado no es un correo electrónico!")
        }
    } else {
        alert("Todos los campos deben ser llenados!");
    }
});

