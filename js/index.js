// firebase 7.15.1
const db = firebase.firestore();

const loginForm = document.getElementById("login");

const saveUser = (user, pwd) => {
    db.collection("users").doc("user").set({
        user:user,
        pwd,pwd
    });
}

const findUser = (user,pwd) => {
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

    const ans = await findUser(user,pwd);  

});