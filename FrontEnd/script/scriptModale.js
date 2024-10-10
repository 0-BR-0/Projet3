const btnFermerModale = document.querySelectorAll('.btnFermerModale')



const fermerModale = () => {
    document.addEventListener('click', function(e) {
        if (e.target === modale || e.target === btnFermerModale[0] || e.target === btnFermerModale[1]) {
            e.preventDefault();
            // e.stopPropagation(".modaleWrapper");
            modale.style.display = "none";
            modaleWrapperAjoutPhoto.style.display = "none"
            console.log("fermerModale")
        }


    })
}


const fetchDataModal = async () => {
    const response = await fetch('http://localhost:5678/api/works')
    const works = await response.json()
    console.log("fetchDataModal")
    displayDataModal(works)
    
} 

const displayDataModal = (paramWorks) => {
    const galleryHTML = document.getElementById("modaleAffichageTravaux")
    galleryHTML.innerHTML = '';
    paramWorks.forEach(element => {
        //creer balise figure en js
        const figureHTML = document.createElement("figure")
        //alimenter attribu src img
        figureHTML.classList = "classFigure"
        //creer balise img en JS
        const imgHTML = document.createElement("img")
        //alimenter attribu id img
        imgHTML.id = element.id
        //alimenter attribu src img
        imgHTML.src = element.imageUrl
        //alimenter attribu alt img
        imgHTML.alt = element.title
        //inclure img dans figure
        figureHTML.appendChild(imgHTML)        
        //inclure figure dans gallery
        galleryHTML.appendChild(figureHTML)

        // Créer le bouton supprimer
        const btnSupprimerIMG = document.createElement("span");
        btnSupprimerIMG.id = element.id
        // btnSupprimerIMG.type = "submit"
        btnSupprimerIMG.classList = "btnSupprimerIMG"
        btnSupprimerIMG.innerHTML = '<i class="fa-solid fa-trash-can"></i>'; // Icône supprimer
        // Ajouter le bouton supprimer à la figure
        figureHTML.appendChild(btnSupprimerIMG);
        btnSupprimerIMG.addEventListener('click', async function(e) {
            e.preventDefault();
            console.log("btnSupprimerIMG")
            await deleteImage(element.id);
            await fetchDataModal();
            await fetchData();
        })
    });
}


const deleteImage = async (id) =>  {
    console.log(id)
    const verifToken = sessionStorage.getItem("Token")
    const response = await fetch('http://localhost:5678/api/works/'+ id, {
        method: "DELETE",
        headers: {
            'Authorization': `Bearer ${verifToken}`, // Intègre le token dans l'en-tête Authorization
          }

    })
    console.log('http://localhost:5678/api/works/'+ id)
    console.log("deletImage")


}

const btnModaleAjout = document.getElementById("btnModaleAjout")

function ouvrirModaleAjoutPhoto() {
    btnModaleAjout.addEventListener('click', () => {
        modaleWrapper.style = "display: none;"
        modaleWrapperAjoutPhoto.style.display = "flex";
        console.log("ouvrirModaleAjoutPhoto")
        fetchCategories()

    });
}

ouvrirModaleAjoutPhoto()
fermerModale();
// fetchDataModal();