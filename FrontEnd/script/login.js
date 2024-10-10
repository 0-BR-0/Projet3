const inputEmail = document.getElementById("email");
const inputPassword = document.getElementById("password");
const submitButton = document.getElementById("seConnecter");

// Ajout d'un écouteur d'événement au bouton de soumission
submitButton.addEventListener('click', function (event) {
    event.preventDefault();
    recupererIdentifiants();
    console.log("seConnecter")
});

//envoyer des informations du formulaire à l'API
async function recupererIdentifiants() {     
    const payloadObject = {
        email: inputEmail.value,
        password: inputPassword.value,
    };
    await envoyerIdentifiants(payloadObject);
}

async function envoyerIdentifiants(payload) {
    const response = await fetch('http://localhost:5678/api/users/login/', {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(payload)
    })

    if (response.status === 200) {
        const userToken = response.json()
        userToken.then((resultat) => {console.log(resultat.token)
            //stocker le token dans session storage
            sessionStorage.setItem("Token", resultat.token)
            window.location.replace("index.html")
            console.log("envoyerIdentifiants")
        })
    } else {
        const errorHTML = document.getElementById("error")
        errorHTML.innerHTML = "E-mail ou mot de passe incorrect"
    }
}


