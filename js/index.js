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

loginForm.addEventListener("click", async(e) =>{
    e.preventDefault();
    const user = document.getElementById("user").value;
    const pwd = document.getElementById("password").value;

    if(user != "" && pwd != ""){
        await findUserLogin(user,pwd);  
    } else {
        alert("Todos los campos deben ser llenados!");
    }
});

