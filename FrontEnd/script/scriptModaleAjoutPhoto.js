const btnRetourModale = document.querySelector(".btnRetourModale")
const selectCategorie = document.getElementById("categorie")
const btnModaleValiderAjout = document.getElementById("btnModaleValiderAjout")
const inputAjouterImage = document.getElementById("inputAjouterImage")
const inputTitre = document.getElementById("titre")
const idForm = document.getElementById("idForm")

// idForm.addEventListener('submit', function (event){
//     event.preventDefault()
//     console.log("submit")
// })

function retourModale() {
    btnRetourModale.addEventListener('click', () => {
        modaleWrapperAjoutPhoto.style.display = "none"
        modaleWrapper.style = "display: flex;"
    });
}

btnModaleValiderAjout.addEventListener('click', function (event) {
        event.preventDefault()
        console.log("btnModaleValiderAjout")
        sendFile()
    });

async function sendFile() {
    const formData = new FormData();
    formData.append("title", inputTitre.value);
    formData.append("image", inputAjouterImage.files[0]); // Utilisation du fichier sélectionné
    formData.append("category", selectCategorie.value);
    const verifToken = sessionStorage.getItem("Token")
    const response = await fetch('http://localhost:5678/api/works/', {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${verifToken}`,
        },
        body: formData
    });
}

const fetchCategories = async () => {
    const response = await fetch('http://localhost:5678/api/categories');
    const categories = await response.json();
    categories.forEach(category => {
        const option = document.createElement("option");
        option.value = category.id;
        option.textContent = category.name;
        selectCategorie.appendChild(option);
    });
}

// fetchCategories()
retourModale()

