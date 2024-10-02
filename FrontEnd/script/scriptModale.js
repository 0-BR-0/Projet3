const btnFermerModale = document.querySelectorAll('.btnFermerModale')

// const fermerModale = () => {
//     document.addEventListener('click', function(e) {
//         if (e.target === btnFermerModale) {
//             e.preventDefault();
//             // e.stopPropagation(".modaleWrapper");
//             modale.style.display = "none";
//             console.log("fermerModale");
//             console.log(btnFermerModale)
//         } if (e.target === modale) {
//             modale.style.display = "none";
//             console.log("fermerModale");
//             console.log(btnFermerModale)
//         }

//     })
// }

const fermerModale = () => {
    document.addEventListener('click', function(e) {
        if (e.target === modale || e.target === btnFermerModale[0] || e.target === btnFermerModale[1]) {
            e.preventDefault();
            // e.stopPropagation(".modaleWrapper");
            modale.style.display = "none";
            modaleWrapperAjoutPhoto.style.display = "none"
            // console.log("fermerModale1");
            // console.log(btnFermerModale[0])
        }

        // if (e.target === btnFermerModale[1]) {
        //     e.preventDefault();
        //     // e.stopPropagation(".modaleWrapper");
        //     modale.style.display = "none";
        //     modaleWrapperAjoutPhoto.style.display = "none"
        //     // console.log("fermerModale2");
        //     // console.log(btnFermerModale[1])
        // }
    })
}

// const btnFermerModale = document.getElementById("btnFermerModale")
// btnFermerModale.addEventListener('click', () => {
//     event.preventDefault();
//     modale.style.display = "none"
//     console.log(modale)
// });

const fetchDataModal = async () => {
    // console.log('fetchDataModal');
    const response = await fetch('http://localhost:5678/api/works')
    const works = await response.json()
    displayDataModal(works)
    
} 

const displayDataModal = (paramWorks) => {
    // console.log('displayDataModal')
    // console.log('paramWorks', paramWorks)
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
        const btnSupprimerIMG = document.createElement("button");
        btnSupprimerIMG.id = element.id
        btnSupprimerIMG.type = "button"
        btnSupprimerIMG.classList = "btnSupprimerIMG"
        btnSupprimerIMG.innerHTML = '<i class="fa-solid fa-trash-can"></i>'; // Icône supprimer
        // Ajouter le bouton supprimer à la figure
        figureHTML.appendChild(btnSupprimerIMG);
        btnSupprimerIMG.addEventListener('click', async function(e) {
            e.preventDefault();
           await deleteImage(element.id);
        })
    });
}


const deleteImage = async (id) =>  {
    // console.log("deleteImage", id)
    // id = "{" + id + "}"
    console.log(id)
    const verifToken = sessionStorage.getItem("Token")
    const response = await fetch('http://localhost:5678/api/works/'+ id, {
        method: "DELETE",
        headers: {
            'Authorization': `Bearer ${verifToken}`, // Intègre le token dans l'en-tête Authorization
          }

    })
    // console.log(verifToken)
    // console.log(response)
    console.log('http://localhost:5678/api/works/'+ id)


}

const btnModaleAjout = document.getElementById("btnModaleAjout")

function ouvrirModaleAjoutPhoto() {
    btnModaleAjout.addEventListener('click', () => {
        modaleWrapper.style = "display: none;"
        modaleWrapperAjoutPhoto.style.display = "flex";

    });
}

ouvrirModaleAjoutPhoto()
fermerModale();
fetchDataModal();