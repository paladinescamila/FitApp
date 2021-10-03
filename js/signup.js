
const signupForm = document.getElementById("signup");

const saveUser = (user, pwd) => {
    db.collection("users").doc(user).set({
        user:user,
        pwd,pwd
    });
}


//Revisar el parametro name, falta decidir en qué colección se va a guardar
const findUser = (user,pwd,name, cent) => {
    let flag = cent;
    const collectionRef = db.collection("users")
    try{
        const response = collectionRef.where('user', '==', user).onSnapshot((snapshot) => {
            if (snapshot.docs.length === 0 && flag){
                saveUser(user,pwd)
                alert("Usuario registrado con éxito!");
                flag = false;
                document.getElementById("name").value = ""
                document.getElementById("user").value = ""
                document.getElementById("pwd").value = ""
            }
            else if (snapshot.docs.length > 0 && flag){
                alert("El usuario ya se encuentra creado, por favor, inicie sesión!");
                flag = false;
            }
        })
    } catch (error){
        console.log(error)
    }
}


signupForm.addEventListener("click", async(e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const user = document.getElementById("user").value;
    const pwd = document.getElementById("pwd").value;
    if(name != "" && user != "" && pwd != ""){
        await findUser(user,pwd,name,true);
    }else{
        alert("Todos los campos deben ser llenados!");
    }
})