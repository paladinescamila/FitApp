const loginForm = document.getElementById("login");

const findUserLogin = (user,pwd) => {
    const collectionRef = db.collection("users")
    try{
        const response = collectionRef.where('user', '==', user).onSnapshot(snapshot => {
            if (snapshot.docs.length === 0){
                alert("El usuario no se encuentra creado, por favor, registrese!")
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
            await findUserLogin(user.toLowerCase(),pwd);  
        } else {
            alert("El texto ingresado no es un correo electrónico!")
        }
    } else {
        alert("Todos los campos deben ser llenados!");
    }
});

