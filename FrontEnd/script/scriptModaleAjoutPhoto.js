const btnRetourModale = document.querySelector(".btnRetourModale")
const selectCategorie = document.getElementById("categorie")
const btnModaleValiderAjout = document.getElementById("btnModaleValiderAjout")
const inputAjouterImage = document.getElementById("inputAjouterImage")
const inputTitre = document.getElementById("titre")

function retourModale() {
    btnRetourModale.addEventListener('click', () => {
        modaleWrapperAjoutPhoto.style.display = "none"
        modaleWrapper.style = "display: flex;"

    });
}

btnModaleValiderAjout
    .addEventListener('click', function (event) {
        event.preventDefault()
        console.log("test")
        recupererInfo()
    });

async function recupererInfo() {
    event.preventDefault();
    console.log("test2")

     
    const payloadObjectFormulaire = {
        title: inputTitre.value,
        imageUrl: inputAjouterImage.value,
        categoryId: selectCategorie.value,
    };
    console.log(inputTitre.value)
    console.log("payloadObjectFormulaire", payloadObjectFormulaire)

    
        // Créer un objet FormData
        const formData = new FormData();

        // Ajouter les données du formulaire à FormData
        formData.append("title", inputTitre.value);
        formData.append("image", inputAjouterImage.files[0]); // Utilisation du fichier sélectionné
        formData.append("category", selectCategorie.value);
        console.log(formData)

    await envoyerInfo(formData)
    //const chargeUtile = JSON.stringify(identifiant)

}

async function envoyerInfo(formData) {

    console.log("formDatatest", formData)
    const verifToken = sessionStorage.getItem("Token")
    console.log(verifToken)


    const response = await fetch('http://localhost:5678/api/works/', {
        method: "POST",
        headers: {
            // "Content-Type": "application/json", 
            'Authorization': `Bearer ${verifToken}`,
        },
        body: formData
    });
    console.log(response);
    console.log(response.status);

    // if (response.status === 200) {
    //     const userToken = response.json()
    //     // console.log(userToken)
    //     // location.replace("URL")
    //     userToken.then((resultat) => {console.log(resultat.token)
    //         //stocker le token dans session storage
    //         sessionStorage.setItem("Token", resultat.token)
    //         window.location.replace("index.html")
    //     })
    // } else {
    //     const errorHTML = document.getElementById("error")
    //     errorHTML.innerHTML = "E-mail ou mot de passe incorrect"
    // }
    //récuperer le token de réponse du Back
    //a faire !!!si dans la reponse status = 401 ou 404 ou ok = false, afficher “Erreur dans l’identifiant ou le mot de passe”
    //a faire !!!sinon status = 200 ou ok = true stocker le token dans session storage, rediriger vers page d'accueil (location.replace("URL")?)
}

const fetchCategories = async () => {
    // console.log('fetchCategories');
    const response = await fetch('http://localhost:5678/api/categories');
    const categories = await response.json();
    // console.log(categories)
    categories.forEach(category => {
        const option = document.createElement("option");
        // option.id = category.id;
        option.value = category.id;
        option.textContent = category.name;
        selectCategorie.appendChild(option);
    });

    // displayCategories(categories)
}

// const displayCategories = (paramCategories) => {

// }




fetchCategories()
retourModale()

