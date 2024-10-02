const inputEmail = document.getElementById("email")
const inputPassword = document.getElementById("password")
const submitButton = document.getElementById("seConnecter")

// console.log(submitButton)

submitButton
    .addEventListener('click', function (event) {
        event.preventDefault()
        recupererIdentifiants()
    });

//envoyer des informations du formulaire à l'API
async function recupererIdentifiants() {
    event.preventDefault();
     
    const payloadObject = {
        email: inputEmail.value,
        password: inputPassword.value,
    };
    // console.log(inputEmail.value)
    // console.log("payloadObject", payloadObject)
    await envoyerIdentifiants(payloadObject)
    //const chargeUtile = JSON.stringify(identifiant)

}

async function envoyerIdentifiants(payload) {

    console.log("payloadtest", payload)
    const response = await fetch('http://localhost:5678/api/users/login/', {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(payload)
    })
    // console.log(response)
    // console.log(response.status)

    if (response.status === 200) {
        const userToken = response.json()
        // console.log(userToken)
        // location.replace("URL")
        userToken.then((resultat) => {console.log(resultat.token)
            //stocker le token dans session storage
            sessionStorage.setItem("Token", resultat.token)
            window.location.replace("index.html")
        })
    } else {
        const errorHTML = document.getElementById("error")
        errorHTML.innerHTML = "E-mail ou mot de passe incorrect"
    }
    //récuperer le token de réponse du Back
    //a faire !!!si dans la reponse status = 401 ou 404 ou ok = false, afficher “Erreur dans l’identifiant ou le mot de passe”
    //a faire !!!sinon status = 200 ou ok = true stocker le token dans session storage, rediriger vers page d'accueil (location.replace("URL")?)
}


    // fetch('http://localhost:5678/api/users/login/', {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(payload)
    // })
    // .then((response) => {
        // console.log(response)

    //  console.log("payloadtest", payload)
    //  const response = await fetch('http://localhost:5678/api/users/login', {
    //      method: "POST",
    //      headers: {"Content-Type": "application/json"},
    //      body: JSON.stringify(payload)

//récuperer le token de réponse du Back
//stocker le token dans session storage

//sur script.js
//récuperer le token
//si le token est présent, faire afficher le bouton modifier
//au clic sur le bouton modifier, faire afficher une modale
