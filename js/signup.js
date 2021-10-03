
const signupForm = document.getElementById("signup");

const saveUser = (user, pwd) => {
    db.collection("users").doc(user).set({
        user:user,
        pwd,pwd
    });
}


//Revisar el parametro name, falta decidir en qué colección se va a guardar
const findUser = (user,pwd,name) => {
    const collectionRef = db.collection("users")
    try{
        const response = collectionRef.where('user', '==', user).onSnapshot((snapshot) => {
            if (snapshot.docs.length > 0){
                alert("El usuario ya se encuentra creado, por favor, inicie sesión!");
            }
            else if (snapshot.docs.length === 0){
                saveUser(user,pwd)
                alert("Usuario registrado con éxito!")
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
    await findUser(user,pwd,name)
})