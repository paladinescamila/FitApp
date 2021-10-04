
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}


const signupForm = document.getElementById("signup");


const saveUser = async (user, pwd, name) => {
    await db.collection("users").doc(user).set({
        user:user,
        pwd:pwd
    }).then(() => {
        console.log("Listo el usuario!")
    });
    
    await db.collection("info").doc(user).set({
            user:user,
            name:name
        }).then(() =>{
            console.log("Lista la info!")
        });
}
    
// saveUser("hola@gmail.com", "hola", "hola")
    
//Revisar el parametro name, falta decidir en qué colección se va a guardar
const findUser = (user, pwd, name, cent) => {
    let flag = cent;
    var newWindow = false;
    const collectionRef = db.collection("users")
    try{
        const response = collectionRef.where('user', '==', user).onSnapshot(async (snapshot) => {
            if (snapshot.docs.length === 0 && flag){
                saveUser(user, pwd, name)
                alert("Usuario registrado con éxito!");
                flag = false;
                document.getElementById("name").value = ""
                document.getElementById("user").value = ""
                document.getElementById("pwd").value = ""

                // Dormimos el sistema un rato
                await new Promise(r => setTimeout(r, 2000));
                window.location.replace(window.location.href.slice(0,window.location.href.indexOf("signup.html"))+"form.html?user="+user)
   
            }
            else if (snapshot.docs.length > 0 && flag){
                alert("El correo electrónico ya se encuentra asociado a una cuenta, por favor, inicie sesión!");
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
        if(validateEmail(user)){
            if(pwd.length < 8){
                alert("La contraseña debe tener al menos 8 caracteres");
            } else{
                findUser(user.toLowerCase(),pwd,name,true)
            }
        } else {
            alert("El texto ingresado no es un correo electrónico");
        }
    }else{
        alert("Todos los campos deben ser llenados!");
    }
})